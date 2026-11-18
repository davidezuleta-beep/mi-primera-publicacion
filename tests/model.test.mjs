import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { capabilityRows, capability, emptyFilters, filterPlatforms, integrationCounts, toggleSelection, recommend } from '../dist/model.js';
import { sources } from '../dist/sources.js';

const dataset = JSON.parse(await readFile(new URL('../dist/data.json', import.meta.url), 'utf8'));
const { platforms, status_legend } = dataset;
const ids = results => results.map(p => p.id);

test('the supplied JSON is preserved exactly, including all status and caution values', async () => {
  const spec = await readFile(new URL('../specification.md', import.meta.url), 'utf8');
  const original = JSON.parse(spec.match(/```\s*json\s*\r?\n([\s\S]*?)```/)[1]);
  assert.deepEqual(dataset, original);
  assert.equal(platforms.length, 6);
});
test('every platform capability resolves to a documented state and every source resolves to an official URL', () => {
  for (const p of platforms) {
    for (const row of capabilityRows) assert.ok(status_legend[capability(p, row.key).status], `${p.id}: ${row.key}`);
    for (const id of p.source_ids) assert.ok(sources[id]?.[1].startsWith('https://'), id);
  }
});
test('integration chart represents precisely four capabilities for every platform', () => {
  for (const p of platforms) assert.equal(Object.values(integrationCounts(p)).reduce((a, b) => a + b), 4);
  assert.deepEqual(integrationCounts(platforms.find(p => p.id === 'lovable')), { included: 4, configurable: 0, external: 0, limited: 0 });
  assert.deepEqual(integrationCounts(platforms.find(p => p.id === 'vercel')), { included: 0, configurable: 2, external: 2, limited: 0 });
  assert.deepEqual(integrationCounts(platforms.find(p => p.id === 'github_pages')), { included: 0, configurable: 0, external: 0, limited: 4 });
});
test('matrix distinguishes technical logs from business audit', () => {
  const lovable = platforms.find(p => p.id === 'lovable');
  const render = platforms.find(p => p.id === 'render');
  assert.equal(capability(lovable, 'logs').status, 'included');
  assert.equal(capability(lovable, 'audit').status, 'conditional');
  assert.equal(capability(render, 'logs').status, 'included');
  assert.equal(capability(render, 'audit').status, 'external');
});
test('filters combine requirements, project, category, cost and management; reset returns all', () => {
  assert.equal(filterPlatforms(platforms, emptyFilters()).length, 6);
  assert.deepEqual(ids(filterPlatforms(platforms, { ...emptyFilters(), project: 'saas', needs: ['data', 'users'], management: 'minimal' })), ['lovable']);
  assert.deepEqual(ids(filterPlatforms(platforms, { ...emptyFilters(), project: 'static', management: 'control', cost: 'free' })), ['vercel']);
  assert.deepEqual(ids(filterPlatforms(platforms, { ...emptyFilters(), category: 'create', needs: ['flex'] })), []);
  assert.ok(!ids(filterPlatforms(platforms, { ...emptyFilters(), needs: ['access', 'users'] })).includes('github_pages'));
});
test('search tolerates accents, case and multiple words in business descriptions', () => {
  assert.deepEqual(ids(filterPlatforms(platforms, { ...emptyFilters(), search: 'CLOUDFLARE' })), ['cloudflare']);
  assert.ok(ids(filterPlatforms(platforms, { ...emptyFilters(), search: 'documentacion' })).includes('github_pages'));
  assert.deepEqual(ids(filterPlatforms(platforms, { ...emptyFilters(), search: 'no existe esta plataforma' })), []);
});
test('selection never exceeds three; removing an item preserves the other two', () => {
  let selected = [];
  for (const id of ['lovable', 'vercel', 'render']) selected = toggleSelection(selected, id).selected;
  const fourth = toggleSelection(selected, 'cloudflare');
  assert.ok(fourth.error);
  assert.deepEqual(fourth.selected, ['lovable', 'vercel', 'render']);
  assert.deepEqual(toggleSelection(selected, 'vercel').selected, ['lovable', 'render']);
  assert.deepEqual(toggleSelection(toggleSelection(selected, 'vercel').selected, 'cloudflare').selected, ['lovable', 'render', 'cloudflare']);
});
test('sensitive information and enterprise data never yield automatic recommendations', () => {
  const input = { project: 'global', data: 'roles', preference: 'integrated', sensitive: true };
  assert.equal(recommend(input).reviewRequired, true);
  assert.deepEqual(recommend(input).ids, []);
  assert.deepEqual(recommend({ ...input, sensitive: false, data: 'enterprise' }).ids, []);
});
test('recommendations explain relevant options and always give alternatives', () => {
  assert.deepEqual(recommend({ project: 'simple', data: 'none', preference: 'integrated' }).ids, ['github_pages', 'cloudflare', 'vercel']);
  assert.equal(recommend({ project: 'product', data: 'roles', preference: 'integrated' }).ids[0], 'lovable');
  assert.equal(recommend({ project: 'internal', data: 'none', preference: 'integrated' }).ids[0], 'chatgpt_sites');
  assert.equal(recommend({ project: 'global', data: 'simple', preference: 'connect' }).ids[0], 'cloudflare');
  assert.equal(recommend({ project: 'product', data: 'roles', preference: 'control' }).ids[0], 'render');
  for (const project of ['simple', 'internal', 'product', 'global']) {
    for (const data of ['none', 'simple', 'roles']) {
      for (const preference of ['integrated', 'connect', 'control']) {
        const result = recommend({ project, data, preference });
        assert.ok(result.ids.length >= 2 && result.ids.length <= 3);
        assert.ok(result.reason.length > 50);
        assert.ok(result.ids.every(id => platforms.some(p => p.id === id)));
      }
    }
  }
});
