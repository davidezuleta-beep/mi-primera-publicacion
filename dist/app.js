import { capabilityRows, capability, projectTypes, costOptions, managementOptions, emptyFilters, filterPlatforms, integrationCounts, toggleSelection, recommend, safetyNotice } from './model.js';
import { sources, prices, summaries } from './sources.js';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const iconPaths = {
  search: '<circle cx="10.8" cy="10.8" r="7.3"/><path d="m16.3 16.3 4.2 4.2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  sliders: '<path d="M4 6h6m4 0h6M4 12h10m4 0h2M4 18h2m4 0h10"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
  chart: '<path d="M4 4v16h17M8 15v-4m5 4V7m5 8v-6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list: '<path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  sparkles: '<path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7ZM20 2v4m-2-2h4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
  external: '<path d="M14 3h7v7M21 3l-9 9M10 4H4v16h16v-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.01"/>',
  chevron: '<path d="m8 5 7 7-7 7"/>',
  book: '<path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
  reset: '<path d="M3 10a9 9 0 1 1 2 8M3 3v7h7"/>'
};
function icon(name, cls = '') { return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.info}</svg>`; }
document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));

function logo(id, small = false) {
  const shapes = {
    chatgpt_sites: '<g fill="none" stroke="currentColor" stroke-width="1.65"><path d="m16 4 7 4 1 8-6 5-8-3-1-8 7-6Zm0 0-1 9 9 3M9 10l8 2 1 9M10 18l7-6 6-4"/><path d="m22 3 7 4 1 8-6 5M8 8 3 13l1 8 7 4 7-4M10 25l6 5 8-2 4-7"/></g>',
    lovable: '<defs><linearGradient id="lovable-gradient"><stop stop-color="#ffa46b"/><stop offset=".45" stop-color="#ff6d95"/><stop offset="1" stop-color="#8678ff"/></linearGradient></defs><path d="M7 6a5 5 0 0 1 10 0v9h7a5 5 0 0 1 0 10H7Z" fill="url(#lovable-gradient)"/>',
    vercel: '<path d="M16 5 30 28H2Z" fill="currentColor"/>',
    github_pages: '<path fill="currentColor" d="M16 2a14 14 0 0 0-4.4 27.3c.7.1 1-.3 1-.7v-2.5c-4 .9-4.9-1.7-4.9-1.7-.6-1.7-1.6-2.1-1.6-2.1-1.3-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.2 3.3 1.6 4.1 1.2.1-1 .5-1.7 1-2.1-3.2-.4-6.5-1.6-6.5-7.1 0-1.6.6-2.9 1.5-3.9-.2-.4-.7-1.9.2-3.9 0 0 1.3-.4 4.1 1.5a14.1 14.1 0 0 1 7.4 0c2.8-1.9 4.1-1.5 4.1-1.5.9 2 .4 3.5.2 3.9 1 .9 1.5 2.3 1.5 3.9 0 5.5-3.3 6.7-6.5 7.1.5.5 1 1.4 1 2.8v3.8c0 .4.3.8 1 .7A14 14 0 0 0 16 2Z"/>',
    render: '<path fill="currentColor" d="M3 5h12v7H3Zm12 0h14v13H15ZM3 17h12v12H3Z"/>',
    cloudflare: '<path fill="#f6a94d" d="M11 23H2c-3-6 1-10 6-9 1-9 14-10 17-1 8-1 10 10 3 10Z"/><path d="M3 26h26" stroke="#ffd49a" stroke-width="2"/>'
  };
  return `<span class="platform-logo ${id} ${small ? 'small' : ''}"><svg viewBox="0 0 32 32" aria-hidden="true">${shapes[id]}</svg></span>`;
}

let dataset;
let filters = emptyFilters();
let selected = [];
let page = ['explorar', 'comparar', 'asistente', 'fuentes'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'explorar';
let view = 'grid';
let chartTab = 'matrix';
let assistant = { step: 0, project: '', data: '', preference: '', sensitive: false, complete: false };
const questionOptions = [
  { key: 'project', title: '¿Qué quieres publicar?', intro: 'Empecemos por lo que tienes en mente.', options: [['simple', 'Una página o herramienta sencilla', 'Una página pública, un recurso o un prototipo.'], ['internal', 'Una aplicación para uso interno', 'Una herramienta para tu equipo u organización.'], ['product', 'Un producto digital para clientes', 'Una experiencia que otras personas van a utilizar.'], ['global', 'Un servicio para muchos países', 'Una aplicación con alcance y usuarios globales.']] },
  { key: 'data', title: '¿Necesitas guardar información y gestionar usuarios?', intro: 'Piensa en la información que manejará tu aplicación.', options: [['none', 'No lo necesito', 'El contenido se consulta sin cuentas ni datos guardados.'], ['simple', 'Sí, de forma sencilla', 'Registros, archivos o cuentas básicas.'], ['roles', 'Sí, con permisos por usuario', 'Cada persona accede a sus propios datos.'], ['enterprise', 'Sí, con requisitos empresariales', 'Controles de seguridad y auditoría específicos.']] },
  { key: 'preference', title: '¿Cómo prefieres administrar tu aplicación?', intro: 'Elige cuánto quieres decidir sobre las piezas de tu proyecto.', options: [['integrated', 'Tener todo integrado', 'Gestionar la aplicación en un solo entorno.'], ['connect', 'Elegir y conectar servicios', 'Combinar herramientas según tus necesidades.'], ['control', 'Tener el mayor control posible', 'Decidir sobre la arquitectura y sus componentes.']] }
];

function statusBadge(status) {
  const entry = dataset.status_legend[status];
  return `<span class="status-badge ${status}" title="${esc(entry.description)}"><span class="badge-mark">${status === 'included' ? '✓' : status === 'not_native' ? '−' : status === 'conditional' ? '◌' : status === 'limited' ? '◐' : '◇'}</span>${esc(entry.label)}</span>`;
}
function externalLink(id, label) {
  const source = sources[id];
  return source ? `<a class="source-link" href="${source[1]}" target="_blank" rel="noopener noreferrer">${esc(label || source[0])}${icon('external')}</a>` : '<span class="muted">Verificar con el proveedor</span>';
}
function visiblePlatforms() { return filterPlatforms(dataset.platforms, filters); }
function verifiedDate() { return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${dataset.metadata.verified_on}T12:00:00Z`)); }
function activeFilterCount() { return filters.needs.length + ['project', 'cost', 'management'].filter(k => filters[k]).length + (filters.category !== 'all' ? 1 : 0) + (filters.search ? 1 : 0); }
function resultCount() { return `<span class="result-counter" role="status"><b>${visiblePlatforms().length}</b> de 6 plataformas</span>`; }
function selectOptions(options, current) { return options.map(o => `<option value="${o.value}" ${o.value === current ? 'selected' : ''}>${o.label}</option>`).join(''); }
function renderFilters() {
  const needs = [['domain', 'Usar dominio propio'], ['users', 'Permitir inicio de sesión'], ['data', 'Guardar información'], ['files', 'Recibir y guardar archivos'], ['logs', 'Registrar actividad'], ['access', 'Restringir el acceso'], ['connect', 'Conectar servicios externos'], ['flex', 'Elegir la tecnología']];
  $('#filter-controls').innerHTML = `
    <label class="filter-label" for="project-filter">¿QUÉ QUIERO CONSTRUIR?</label>
    <div class="select-wrap"><select id="project-filter" data-filter="project">${selectOptions(projectTypes, filters.project)}</select></div>
    <fieldset class="needs"><legend class="filter-label">¿QUÉ NECESITO QUE HAGA?</legend>${needs.map(([key, label]) => `<label class="checkbox-label"><input type="checkbox" data-need="${key}" ${filters.needs.includes(key) ? 'checked' : ''}><span class="custom-checkbox">${icon('check')}</span>${label}</label>`).join('')}</fieldset>
    <label class="filter-label" for="cost-filter">MODELO DE COSTO</label>
    <div class="select-wrap"><select id="cost-filter" data-filter="cost">${selectOptions(costOptions, filters.cost)}</select></div>
    <label class="filter-label" for="management-filter">¿QUÉ QUIERO ADMINISTRAR?</label>
    <div class="select-wrap"><select id="management-filter" data-filter="management">${selectOptions(managementOptions, filters.management)}</select></div>
    <p class="filter-help">Se incluyen opciones que requieren configuración o un plan compatible. El filtro no garantiza su disponibilidad.</p>
    <div class="filter-result" id="filter-result">${resultCount()}${activeFilterCount() ? `<button class="text-button" data-action="clear">Limpiar filtros</button>` : icon('check')}</div>`;
}

function orb() {
  let lines = '', points = '';
  for (let i = 0; i < 410; i++) {
    const phi = Math.acos(1 - 2 * (i + .5) / 410);
    const theta = i * 2.399963;
    const x = Math.sin(phi) * Math.cos(theta), y = Math.cos(phi), z = Math.sin(phi) * Math.sin(theta);
    const px = 201 + x * 126, py = 150 + y * 126;
    const opacity = .3 + (z + 1) * .3;
    if (i % 3 === 0) lines += `<path d="M92 170 Q${142 + z * 45} ${160 + y * 130} ${px.toFixed(1)} ${py.toFixed(1)}" opacity="${(.08 + (z + 1) * .055).toFixed(2)}"/>`;
    points += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(i % 11 === 0 ? 1.8 : .85 + z * .3).toFixed(1)}" opacity="${opacity.toFixed(2)}" fill="${i % 5 === 0 ? '#61e9e2' : '#d9f9f5'}"/>`;
  }
  return `<svg class="orb" viewBox="0 0 390 300" aria-hidden="true"><defs><radialGradient id="orb-glow"><stop stop-color="#3aede0" stop-opacity=".32"/><stop offset="1" stop-color="#3aede0" stop-opacity="0"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="3"/></filter></defs><circle cx="110" cy="170" r="100" fill="url(#orb-glow)"/><g stroke="#91e6df" fill="none" stroke-width=".6">${lines}</g><g>${points}</g><circle class="orb-hub" cx="92" cy="170" r="7" fill="#6dfff1" filter="url(#glow)"/><circle cx="92" cy="170" r="2.5" fill="#e9fffa"/></svg>`;
}
function hero() {
  return `<section class="hero" aria-labelledby="hero-title"><span class="hero-label">${icon('globe')} DE LA IDEA A LA PUBLICACIÓN</span><div class="hero-art">${orb()}<span class="orb-caption">UN PROYECTO. MUCHAS POSIBILIDADES.</span></div><div class="hero-copy"><div class="eyebrow cyan">ENCUENTRA TU PUNTO DE PARTIDA</div><h2 id="hero-title">Tu próxima idea,<br>en el lugar correcto.</h2><p>Compara lo que incluye cada plataforma.<br> Elige con claridad, construye con confianza.</p><button class="primary-button" data-action="assistant">${icon('sparkles')}Encontrar mi plataforma</button></div><div class="hero-side"><span class="hero-number">06<span>PLATAFORMAS</span></span><div class="signal" aria-hidden="true">${Array.from({ length: 24 }, (_, i) => `<i style="height:${5 + Math.sin(i * .9) ** 2 * 16}px"></i>`).join('')}</div><span class="hero-live">DATOS, NO RANKINGS</span></div></section>`;
}
function searchToolbar() {
  return `<div class="explore-toolbar"><div class="category-tabs" role="group" aria-label="Categoría de plataformas">${[['all', 'Todas'], ['create', 'Crear con IA'], ['publish', 'Publicar mi app'], ['global', 'Alcance global']].map(([value, label]) => `<button data-category="${value}" class="${filters.category === value ? 'active' : ''}" aria-pressed="${filters.category === value}">${label}${value === 'all' ? '<span>6</span>' : ''}</button>`).join('')}</div><div class="view-switch" role="group" aria-label="Vista de plataformas"><button data-view="grid" class="${view === 'grid' ? 'active' : ''}" aria-label="Vista de tarjetas" aria-pressed="${view === 'grid'}">${icon('grid')}</button><button data-view="list" class="${view === 'list' ? 'active' : ''}" aria-label="Vista de lista" aria-pressed="${view === 'list'}">${icon('list')}</button></div></div>`;
}
function selectionButton(p, full = false) {
  const checked = selected.includes(p.id);
  return `<button class="select-platform ${checked ? 'selected' : ''} ${full ? 'full' : ''}" data-select="${p.id}" aria-pressed="${checked}" aria-label="${checked ? 'Quitar' : 'Añadir'} ${p.name} ${checked ? 'de' : 'a'} la comparación">${icon(checked ? 'check' : 'plus')}<span>${checked ? 'Seleccionada' : 'Comparar'}</span></button>`;
}
function platformCard(p, recommended = false) {
  const summary = summaries[p.id], price = prices[p.id];
  return `<article class="platform-card ${selected.includes(p.id) ? 'is-selected' : ''} ${recommended ? 'recommended' : ''}"><div class="card-top">${logo(p.id)}<span class="card-type">${summary.type}</span>${selectionButton(p)}</div><button class="card-title" data-detail="${p.id}"><h3>${p.name}</h3>${icon('chevron')}</button><p class="card-description">${summary.description}</p><div class="card-tags">${summary.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="card-capabilities">${[['data', 'Datos'], ['users', 'Usuarios'], ['files', 'Archivos']].map(([key, label]) => `<button data-cell="${key}" data-platform="${p.id}" class="cap-mini ${capability(p, key).status}" title="${label}: ${dataset.status_legend[capability(p, key).status].label}"><span class="cap-symbol" aria-hidden="true">${({included:"✓",configurable:"◇",external:"◇",limited:"◐",conditional:"◌",not_native:"−"})[capability(p,key).status]}</span>${label}<span class="sr-only">: ${dataset.status_legend[capability(p, key).status].label}</span></button>`).join('')}</div><div class="card-bottom"><div class="card-price"><strong>${price.amount}</strong><span>${price.unit}</span></div><button class="detail-button" data-detail="${p.id}" aria-label="Ver detalle de ${p.name}">Ver detalle${icon('chevron')}</button></div></article>`;
}
function emptyState(text = 'Ninguna plataforma coincide con estos filtros.') { return `<div class="empty-state">${icon('search')}<h3>Probemos otro camino</h3><p>${text}</p><button class="secondary-button" data-action="clear">${icon('reset')}Limpiar filtros</button></div>`; }
function sectionHeading(title, sub, right = '') { return `<div class="section-heading"><div><h2>${title}</h2>${sub ? `<p class="muted">${sub}</p>` : ''}</div>${right}</div>`; }
function comparisonMatrix(platforms, detailed = false) {
  if (!platforms.length) return emptyState();
  return `<div class="table-scroll" tabindex="0" role="region" aria-label="Matriz de capacidades, desplazamiento horizontal"><table class="capability-table ${detailed ? 'detailed' : ''}"><caption class="sr-only">Comparación de capacidades. Selecciona una celda para ver detalles y fuentes.</caption><thead><tr><th scope="col">CAPACIDAD</th>${platforms.map(p => `<th scope="col"><div class="table-platform">${logo(p.id, true)}<span>${p.short_name}</span></div>${detailed ? `<button class="text-button remove-column" data-select="${p.id}">${icon('close')} Quitar</button>` : selectionButton(p)}</th>`).join('')}</tr></thead><tbody>${detailed ? `<tr><th scope="row">Propósito</th>${platforms.map(p => `<td class="text-cell">${esc(p.purpose)}</td>`).join('')}</tr>` : ''}${capabilityRows.map(row => `<tr><th scope="row">${row.label}</th>${platforms.map(p => `<td><button class="cell-button" data-cell="${row.key}" data-platform="${p.id}" aria-label="${p.name}, ${row.label}: ${dataset.status_legend[capability(p, row.key).status].label}. Ver explicación">${statusBadge(capability(p, row.key).status)}</button></td>`).join('')}</tr>`).join('')}${detailed ? `<tr><th scope="row">Uso recomendado</th>${platforms.map(p => `<td class="text-cell">${p.ideal_for.map(x => `<p>${esc(x)}</p>`).join('')}</td>`).join('')}</tr><tr><th scope="row">Crecimiento y límites</th>${platforms.map(p => `<td class="text-cell"><b>${esc(p.scale.label)}</b><p>${esc(p.scale.detail)}</p>${p.scale.documented_limits.map(x => `<p class="muted">${esc(x)}</p>`).join('')}</td>`).join('')}</tr><tr><th scope="row">Precio de entrada</th>${platforms.map(p => `<td class="text-cell"><p>${esc(p.pricing.entry)}</p><p class="muted">${esc(p.pricing.model)}</p>${externalLink(prices[p.id].source, 'Consultar precios y límites')}</td>`).join('')}</tr><tr><th scope="row">Publicar una versión</th>${platforms.map(p => `<td class="text-cell"><b>${esc(p.publishing.label)}</b><p>${esc(p.publishing.detail)}</p></td>`).join('')}</tr><tr><th scope="row">Consideraciones</th>${platforms.map(p => `<td class="text-cell"><p>${esc(p.security.caution || p.security.detail)}</p><p>${esc(p.pricing.commercial_note)}</p><b>Menos apropiado para</b>${p.not_ideal_for.map(x => `<p>${esc(x)}</p>`).join('')}</td>`).join('')}</tr>` : ''}</tbody></table></div>`;
}
function statusLegend() { return `<div class="status-legend">${Object.keys(dataset.status_legend).map(status => statusBadge(status)).join('')}</div>`; }
function integrationChart(platforms, compact = false) {
  if (!platforms.length) return `<p class="muted chart-empty">No hay plataformas que coincidan.</p>`;
  return `<div class="integration-chart ${compact ? 'compact' : ''}">${platforms.map(p => {
    const counts = integrationCounts(p);
    return `<div class="chart-row"><button class="chart-name" data-detail="${p.id}">${p.short_name}</button><div class="stacked-bar" role="group" aria-label="Capacidades de ${p.name}">${Object.entries(counts).filter(([, count]) => count).map(([status, count]) => `<button class="bar-segment ${status}" style="width:${count * 25}%" data-integration="${p.id}" data-group="${status}" title="${count} de 4: ${status === 'limited' ? 'con límites o no incluido' : dataset.status_legend[status].label}" aria-label="${p.name}: ${count} de 4 ${status === 'limited' ? 'con límites o no incluido' : dataset.status_legend[status].label}">${compact ? '' : count}</button>`).join('')}</div><span class="chart-total">4</span></div>`;
  }).join('')}</div>`;
}
function growthCards(platforms) {
  const growthTypes = [
    { value: 'static', label: 'Páginas estáticas', ids: ['github_pages', 'cloudflare', 'vercel'] },
    { value: 'light', label: 'Aplicaciones ligeras', ids: ['chatgpt_sites', 'lovable', 'vercel', 'cloudflare'] },
    { value: 'data', label: 'Aplicaciones con datos y usuarios', ids: ['chatgpt_sites', 'lovable', 'vercel', 'render', 'cloudflare'] },
    { value: 'saas', label: 'Productos SaaS', ids: ['lovable', 'vercel', 'render', 'cloudflare'] },
    { value: 'traffic', label: 'Servicios de alto tráfico', ids: ['vercel', 'cloudflare'] },
    { value: 'global', label: 'Aplicaciones distribuidas globalmente', ids: ['cloudflare', 'vercel'] }
  ];
  return `<div class="growth-grid">${growthTypes.map(type => {
    const matches = platforms.filter(p => type.ids.includes(p.id));
    return `<article class="growth-card">${icon(type.value === 'global' ? 'globe' : type.value === 'static' ? 'book' : 'layers')}<h3>${type.label}</h3><div class="growth-options">${matches.length ? matches.map(p => `<button data-detail="${p.id}">${logo(p.id, true)}${p.short_name}</button>`).join('') : '<p class="muted">Sin coincidencias con los filtros actuales.</p>'}</div><p class="footnote">${type.value === 'global' ? 'El alcance depende de la arquitectura, el tráfico y el presupuesto.' : type.value === 'data' ? 'Sites admite aplicaciones ligeras y funciones compatibles. Revisa los permisos y límites de cada opción.' : 'La adecuación depende del diseño y los servicios conectados. Consulta los límites de cada plataforma.'}</p></article>`;
  }).join('')}</div><p class="footnote">Son categorías de uso, no niveles absolutos de capacidad. Una plataforma puede servir para varios tipos de proyecto.</p>`;
}
function priceCards(platforms) {
  return `<div class="price-grid">${platforms.map(p => `<article class="price-card"><div class="table-platform">${logo(p.id, true)}<h3>${p.name}</h3></div><div class="big-price">${prices[p.id].amount}<span>${prices[p.id].unit}</span></div><p>${prices[p.id].note}</p><h4>Qué incluye</h4><p>${esc(p.pricing.entry)}</p><h4>Qué puede generar cargos adicionales</h4><p class="muted">${esc(p.pricing.model)}</p><h4>Plan gratuito y restricciones</h4><p class="muted">${prices[p.id].free}</p>${p.pricing.enterprise_note ? `<p class="muted">${esc(p.pricing.enterprise_note)}</p>` : ''}${externalLink(prices[p.id].source, p.id === 'github_pages' ? 'Consultar límites oficiales' : 'Consultar precios oficiales')}</article>`).join('')}</div>`;
}
function analysisSection(platforms) {
  return `<section class="analysis-section">${sectionHeading('Las piezas de tu próxima aplicación', 'Explora las diferencias. Cada capacidad tiene sus matices.', '<span class="micro-label">SIN PUNTUACIONES ARTIFICIALES</span>')}<div class="analysis-tabs" role="group" aria-label="Visualización de capacidades">${[['matrix', 'Mapa de capacidades', 'grid'], ['integration', 'Integración', 'layers'], ['growth', 'Crecimiento', 'chart'], ['cost', 'Modelo de costos', 'database']].map(([key, label, ico]) => `<button data-chart="${key}" class="${chartTab === key ? 'active' : ''}" aria-pressed="${chartTab === key}">${icon(ico)}${label}</button>`).join('')}</div><div class="analysis-body">${!platforms.length ? emptyState() : chartTab === 'matrix' ? `${comparisonMatrix(platforms)}${statusLegend()}<p class="footnote">Selecciona una celda para entender la capacidad y consultar sus fuentes. Incluido no significa gratuito ni ilimitado.</p>` : chartTab === 'integration' ? `<h3>¿Qué viene integrado y qué hay que conectar?</h3><p class="muted">Datos, usuarios, archivos y procesos: cuatro piezas, distintas formas de resolverlas.</p>${integrationChart(platforms)}<div class="chart-legend">${['included', 'configurable', 'external', 'limited'].map(s => `<span><i class="${s}"></i>${s === 'limited' ? 'Con límites o no incluido' : dataset.status_legend[s].label}</span>`).join('')}</div><p class="footnote">Selecciona un segmento para ver qué capacidades representa. No es una puntuación de calidad.</p>` : chartTab === 'growth' ? growthCards(platforms) : `<p class="notice inline-notice">${icon('info')}Los modelos de cobro son distintos. Compara el costo completo de tu proyecto, además del precio de entrada. Precios en USD.</p>${priceCards(platforms)}`}</div></section>`;
}
function renderExplore() {
  const platforms = visiblePlatforms();
  return `<div class="page-heading"><div><h1>Explora las plataformas<span class="title-count">06</span></h1><p>Distintos caminos para publicar. Encuentra el tuyo.</p></div><label class="search-box">${icon('search')}<input type="search" id="platform-search" placeholder="Buscar una plataforma…" value="${esc(filters.search)}" aria-label="Buscar por nombre o tipo de solución"><kbd>/</kbd></label></div>${hero()}${searchToolbar()}<div class="results-line">${resultCount()}<span>Selecciona hasta <b>3</b> para comparar${icon('layers')}</span></div><section class="platform-grid ${view === 'list' ? 'list-view' : ''}" aria-label="Plataformas disponibles">${platforms.length ? platforms.map(p => platformCard(p)).join('') : emptyState()}</section>${analysisSection(platforms)}`;
}
function renderCompare() {
  const platforms = visiblePlatforms().filter(p => selected.includes(p.id));
  const hidden = selected.length - platforms.length;
  return `<div class="page-heading"><div><h1>Compara con perspectiva<span class="title-count">${selected.length}/3</span></h1><p>Las diferencias que importan para tu proyecto, lado a lado.</p></div></div><div class="compare-picker"><span class="filter-label">TU SELECCIÓN</span>${dataset.platforms.map(p => `<button data-select="${p.id}" class="picker-chip ${selected.includes(p.id) ? 'active' : ''}" aria-pressed="${selected.includes(p.id)}">${logo(p.id, true)}${p.short_name}${icon(selected.includes(p.id) ? 'check' : 'plus')}</button>`).join('')}</div>${hidden ? `<p class="notice inline-notice">${icon('info')}${hidden} plataforma${hidden > 1 ? 's de tu selección quedan ocultas' : ' de tu selección queda oculta'} por los filtros. <button class="text-button" data-action="clear">Limpiar filtros</button></p>` : ''}<div class="compare-count">${resultCount()}</div>${platforms.length ? `<p class="muted comparison-intro">Selecciona una capacidad para consultar su explicación y las fuentes oficiales.</p>${comparisonMatrix(platforms, true)}${statusLegend()}${analysisSection(platforms)}` : `<div class="empty-state">${icon('layers')}<h2>${selected.length ? 'Tu selección no coincide con los filtros' : 'Un buen punto de comparación'}</h2><p>${selected.length ? 'Limpia los filtros para volver a ver las plataformas seleccionadas.' : 'Elige dos o tres plataformas arriba para ver sus capacidades, costos y límites lado a lado.'}</p>${selected.length ? '<button class="secondary-button" data-action="clear">Limpiar filtros</button>' : '<button class="primary-button" data-action="explore">Explorar plataformas</button>'}</div>`}<p class="notice inline-notice">${icon('shield')}Los indicadores describen capacidades y trabajo adicional. No son garantías de seguridad ni de rendimiento.</p>`;
}
function renderAssistant() {
  const questions = questionOptions;
  const q = questions[assistant.step];
  if (assistant.complete) {
    const result = recommend(assistant);
    return `<div class="page-heading"><div><h1>${result.reviewRequired ? 'Primero, una revisión informada' : 'Un punto de partida para tu idea'}</h1><p>Orientación inicial basada en lo que nos contaste.</p></div></div><div class="recommendation-summary ${result.reviewRequired ? 'needs-review' : ''}">${icon(result.reviewRequired ? 'shield' : 'sparkles')}<div><span class="eyebrow">${result.reviewRequired ? 'REVISIÓN NECESARIA' : 'TU ORIENTACIÓN INICIAL'}</span><h2>${result.reviewRequired ? 'Tu información requiere una evaluación previa.' : 'Estas opciones merecen una mirada.'}</h2><p>${result.reason}</p></div></div><div class="answer-summary">${questions.map(question => `<span>${esc(question.options.find(o => o[0] === assistant[question.key])?.[1])}</span>`).join('')}</div>${result.reviewRequired ? `<div class="review-checklist"><h3>Revisa con tu equipo de TI</h3><ul><li>Qué datos se pueden tratar y en qué ubicación.</li><li>Plan contratado, contratos y políticas internas.</li><li>Quién entra, qué puede ver y qué queda registrado.</li><li>Copias de seguridad y continuidad de la aplicación.</li></ul><p class="muted">No se recomienda automáticamente una plataforma para este caso.</p><button class="secondary-button" data-action="sources">Consultar fuentes y límites</button></div>` : `<section class="platform-grid recommendation-grid">${result.ids.map(id => platformCard(dataset.platforms.find(p => p.id === id), true)).join('')}</section><div class="notice inline-notice">${icon('info')}Esta recomendación no garantiza seguridad ni aptitud para producción. Valida los planes, los permisos y el diseño de tu aplicación.</div><button class="primary-button" data-action="compare-recommended">${icon('layers')}Comparar estas opciones</button>`}<button class="text-button restart-button" data-action="restart">${icon('reset')}Volver a empezar</button>`;
  }
  return `<div class="page-heading"><div><h1>Una idea. Tu mejor punto de partida.</h1><p>Tres preguntas para descubrir qué plataformas conviene explorar.</p></div></div><section class="assistant-card"><div class="assistant-progress" aria-label="Pregunta ${assistant.step + 1} de 3">${questions.map((question, i) => `<span class="${i <= assistant.step ? 'active' : ''}"><b>${i < assistant.step ? icon('check') : i + 1}</b>${['Tu proyecto', 'Tus datos', 'Tu preferencia'][i]}</span>`).join('')}</div><div class="eyebrow cyan">PREGUNTA ${assistant.step + 1} DE 3</div><h2>${q.title}</h2><p class="muted">${q.intro}</p><fieldset class="assistant-options"><legend class="sr-only">${q.title}</legend>${q.options.map(([value, title, detail]) => `<label class="assistant-option ${assistant[q.key] === value ? 'active' : ''}"><input type="radio" name="assistant-answer" data-answer="${q.key}" value="${value}" ${assistant[q.key] === value ? 'checked' : ''}><span class="radio-mark"></span><span><b>${title}</b><span>${detail}</span></span>${icon('chevron')}</label>`).join('')}</fieldset>${assistant.step === 2 ? `<label class="sensitive-check checkbox-label"><input type="checkbox" id="sensitive-data" ${assistant.sensitive ? 'checked' : ''}><span class="custom-checkbox">${icon('check')}</span><span>Mi proyecto maneja información confidencial, financiera, personal o regulada.</span></label>` : ''}<div class="assistant-actions"><button class="text-button" data-action="back" ${assistant.step === 0 ? 'disabled' : ''}>Anterior</button><span class="muted">Sin registros. Sin puntuaciones.</span><button class="primary-button" data-action="next" ${assistant[q.key] ? '' : 'disabled'}>${assistant.step === 2 ? 'Ver orientación' : 'Continuar'}</button></div></section><div class="assistant-footnote">${icon('shield')}La elección depende de tu proyecto, del plan y de cómo configures tu aplicación.</div>`;
}
function renderSources() {
  const platforms = visiblePlatforms();
  return `<div class="page-heading"><div><h1>Fuentes claras. Decisiones informadas.</h1><p>Documentación oficial y límites que conviene tener presentes.</p></div><a class="secondary-button" href="./data.json" download="deployment-explorer-datos.json">${icon('download')}Descargar datos</a></div><div class="methodology"><span class="eyebrow cyan">VERIFICADO EL ${verifiedDate().toUpperCase()}</span><h2>Una comparación cualitativa, con contexto.</h2><p>${esc(dataset.metadata.methodology)}</p><p class="muted">Los planes, precios, límites y disponibilidad pueden cambiar. Esta demostración educativa no reemplaza una evaluación técnica, contractual, legal o de seguridad.</p></div>${sectionHeading('Cómo leer los indicadores', 'Describen dónde vive una capacidad y cuánto trabajo adicional requiere.') }<div class="legend-grid">${Object.entries(dataset.status_legend).map(([key, value]) => `<div>${statusBadge(key)}<p>${esc(value.description)}</p></div>`).join('')}</div><div class="notice inline-notice">${icon('shield')}${safetyNotice}.</div>${sectionHeading('Documentación por plataforma', 'Consulta la fuente antes de decidir o contratar.', resultCount())}<div class="source-grid">${platforms.length ? platforms.map(p => `<article class="source-card"><div class="table-platform">${logo(p.id, true)}<h3>${p.name}</h3></div><div class="source-list">${p.source_ids.map(id => externalLink(id)).join('')}</div><h4>Límites documentados</h4><ul>${p.scale.documented_limits.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p class="footnote">${esc(p.pricing.commercial_note)}</p></article>`).join('') : emptyState()}</div><section class="editorial-notes"><h2>Seis distinciones que importan</h2><div>${[['Crecimiento', 'La capacidad depende de la arquitectura, los servicios conectados y el presupuesto.'], ['Seguridad', 'Un firewall o un inicio de sesión no garantizan que una aplicación esté segura por defecto.'], ['Dominio propio', 'Tener app.empresa.com no restringe quién puede entrar.'], ['Repositorio privado', 'No convierte automáticamente un sitio de GitHub Pages en privado.'], ['Código propio', 'También hay que trasladar datos, archivos, claves, configuraciones y servicios.'], ['Precio', 'Suscripción, usuarios, consumo y recursos son modelos distintos de cobro.']].map(([label, text]) => `<article><h3>${label}</h3><p>${text}</p></article>`).join('')}</div></section>`;
}

function renderMain(focusSearch = false) {
  const cursor = $('#platform-search')?.selectionStart;
  $('#page-content').innerHTML = page === 'comparar' ? renderCompare() : page === 'asistente' ? renderAssistant() : page === 'fuentes' ? renderSources() : renderExplore();
  document.querySelectorAll('[data-page]').forEach(el => { el.classList.toggle('active', el.dataset.page === page); if (el.dataset.page === page) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current'); });
  if (focusSearch) { const input = $('#platform-search'); input?.focus(); if (input && cursor !== null) input.setSelectionRange(cursor, cursor); }
  document.title = `${{ explorar: 'Explorar plataformas', comparar: 'Comparar plataformas', asistente: 'Encontrar mi plataforma', fuentes: 'Fuentes y límites' }[page]} — Deployment Explorer`;
}
function renderShared() {
  $('#mini-chart').innerHTML = integrationChart(visiblePlatforms(), true);
  $('#header-count').textContent = selected.length;
  if ($('#filter-result')) $('#filter-result').innerHTML = `${resultCount()}${activeFilterCount() ? '<button class="text-button" data-action="clear">Limpiar filtros</button>' : icon('check')}`;
  const tray = $('#comparison-tray');
  tray.hidden = !selected.length || page === 'comparar' || page === 'asistente';
  tray.innerHTML = `<div class="tray-label">${icon('layers')}<span>Tu comparación <b>${selected.length}/3</b></span></div><div class="tray-selections">${selected.map(id => { const p = dataset.platforms.find(p => p.id === id); return `<span>${logo(id, true)}${p.short_name}<button data-select="${id}" aria-label="Quitar ${p.name}">${icon('close')}</button></span>`; }).join('')}${Array.from({ length: 3 - selected.length }, () => '<span class="tray-slot">Añade una plataforma</span>').join('')}</div><button class="primary-button" data-action="compare">Comparar selección</button>`;
  document.body.classList.toggle('has-tray', !tray.hidden);
  $('.verified>span:last-child').textContent = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${dataset.metadata.verified_on}T12:00:00Z`)).replaceAll('.', '').toUpperCase();
  $('.site-footer>span:last-child').textContent = `Datos verificados · ${verifiedDate()}`;
  $('.edition').textContent = `EDICIÓN ${dataset.metadata.verified_on.slice(0, 4)}`;
  const mobileToggle = $('.mobile-filter-toggle');
  if (mobileToggle) mobileToggle.innerHTML = `<span>${icon('sliders')}Filtrar plataformas <span class="mobile-filter-count">${visiblePlatforms().length}/6</span></span><span class="filter-toggle-label">${$('.sidebar').classList.contains('mobile-open') ? 'Ocultar filtros' : 'Ver filtros'}${activeFilterCount() ? ` · ${activeFilterCount()}` : ''}</span>`;
}
function go(next) { if (page === next) return; location.hash = next; }
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4200); }
function showDialog(content) { $('#dialog-content').innerHTML = `<button class="dialog-close" data-action="close-dialog" aria-label="Cerrar detalle">${icon('close')}</button>${content}`; $('#detail-dialog').showModal(); }
function detailSection(title, body) { return `<section class="detail-section"><h3>${title}</h3>${body}</section>`; }
function showPlatform(id) {
  const p = dataset.platforms.find(p => p.id === id);
  showDialog(`<div class="dialog-platform">${logo(id)}<span class="eyebrow">${esc(p.category)}</span></div><h2 id="dialog-title">${p.name}</h2><p class="dialog-intro">${esc(p.purpose)}</p><div class="dialog-selection">${selectionButton(p, true)}</div>${detailSection('Ideal para', `<div class="detail-tags">${p.ideal_for.map(x => `<span>${esc(x)}</span>`).join('')}</div>`)}${detailSection('Dónde y cómo se publica', `<b>${esc(p.publishing.label)}</b><p>${esc(p.publishing.detail)}</p><p class="mono muted">${esc(p.default_address)}</p>`)}${detailSection('Capacidades', `<div class="detail-capabilities">${capabilityRows.map(row => `<button data-cell="${row.key}" data-platform="${id}"><span>${row.label}</span>${statusBadge(capability(p, row.key).status)}</button>`).join('')}</div>`)}${detailSection('Crecimiento y límites', `<h4>${esc(p.scale.label)}</h4><p>${esc(p.scale.detail)}</p><ul>${p.scale.documented_limits.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`)}${detailSection('Acceso y seguridad', `<p>${esc(p.access_control.detail)}</p>${p.access_control.application_login_note ? `<p>${esc(p.access_control.application_login_note)}</p>` : ''}<p>${esc(p.security.detail)}</p>${p.security.caution ? `<p class="notice">${esc(p.security.caution)}</p>` : ''}`)}${detailSection('Código y flexibilidad', `<p>${esc(p.code_and_portability.detail)}</p><p>${esc(p.technology_flexibility.detail)}</p>`)}${detailSection('Costos y condiciones', `<p>${esc(p.pricing.entry)}</p><p>${esc(p.pricing.model)}</p>${p.pricing.enterprise_note ? `<p>${esc(p.pricing.enterprise_note)}</p>` : ''}<p class="notice">${esc(p.pricing.commercial_note)}</p>${externalLink(prices[id].source, 'Consultar precios y límites oficiales')}`)}${detailSection('Menos apropiado para', `<ul>${p.not_ideal_for.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`)}${detailSection('Fuentes oficiales', `<div class="source-list">${p.source_ids.map(id => externalLink(id)).join('')}</div>`)}<p class="footnote">Datos verificados el ${verifiedDate()}.</p>`);
}
function showCell(id, key) {
  const p = dataset.platforms.find(p => p.id === id), row = capabilityRows.find(r => r.key === key), cap = capability(p, key);
  if ($('#detail-dialog').open) $('#detail-dialog').close();
  const additional = key === 'audit' && ['render', 'cloudflare'].includes(id) ? 'La auditoría de las acciones del negocio debe diseñarse en la aplicación o conectarse con otro servicio.' : key === 'logs' && ['lovable', 'vercel'].includes(id) ? 'La matriz distingue los registros técnicos incluidos de la auditoría de negocio, que depende del plan.' : '';
  showDialog(`<div class="dialog-platform">${logo(id, true)}<span>${p.name}</span></div><h2 id="dialog-title">${row.label}</h2>${statusBadge(cap.status)}<h3 class="cell-label">${esc(cap.label)}</h3><p class="dialog-intro">${esc(cap.detail || 'Verificar con el proveedor')}</p>${additional ? `<p class="notice">${additional}</p>` : ''}${cap.caution ? `<p class="notice">${esc(cap.caution)}</p>` : ''}<p class="muted">${dataset.status_legend[cap.status].description} Incluido no significa gratuito ni ilimitado.</p>${detailSection('Fuentes oficiales de la plataforma', `<div class="source-list">${p.source_ids.map(id => externalLink(id)).join('')}</div>`)}<p class="footnote">Estado según la matriz de capacidades de la especificación. Verificado el ${verifiedDate()}.</p><button class="secondary-button" data-detail="${id}">Ver ficha completa</button>`);
}
function showIntegration(id, group) {
  const p = dataset.platforms.find(p => p.id === id);
  const names = { database: 'Guardar información', user_accounts: 'Cuentas de usuario', file_storage: 'Guardar archivos', background_work: 'Procesos automáticos' };
  showDialog(`<div class="dialog-platform">${logo(id, true)}<span>${p.name}</span></div><h2 id="dialog-title">${group === 'limited' ? 'Con límites o no incluido' : dataset.status_legend[group].label}</h2><p class="muted">Capacidades representadas en este segmento del gráfico.</p>${Object.entries(p.backend_components).filter(([, item]) => (['included', 'configurable', 'external'].includes(item.status) ? item.status : 'limited') === group).map(([key, item]) => detailSection(names[key], `${statusBadge(item.status)}<p>${esc(item.detail)}</p>`)).join('')}<div class="source-list">${p.source_ids.map(id => externalLink(id)).join('')}</div>`);
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || !dataset) return;
  if (button.dataset.select) {
    const result = toggleSelection(selected, button.dataset.select);
    if (result.error) return toast(result.error);
    selected = result.selected;
    renderMain(); renderShared();
    if ($('#detail-dialog').open) { const p = dataset.platforms.find(p => p.id === button.dataset.select); const slot = $('.dialog-selection'); if (slot) slot.innerHTML = selectionButton(p, true); }
  } else if (button.dataset.detail) { if ($('#detail-dialog').open) $('#detail-dialog').close(); showPlatform(button.dataset.detail); }
  else if (button.dataset.cell) showCell(button.dataset.platform, button.dataset.cell);
  else if (button.dataset.integration) showIntegration(button.dataset.integration, button.dataset.group);
  else if (button.dataset.category) { filters.category = button.dataset.category; renderMain(); renderShared(); }
  else if (button.dataset.view) { view = button.dataset.view; renderMain(); }
  else if (button.dataset.chart) { const scroll = window.scrollY; chartTab = button.dataset.chart; renderMain(); window.scrollTo({ top: scroll }); }
  else if (button.dataset.action) {
    const action = button.dataset.action;
    if (action === 'mobile-filters') { const open = $('.sidebar').classList.toggle('mobile-open'); button.setAttribute('aria-expanded', open); renderShared(); }
    else if (action === 'clear') { filters = emptyFilters(); renderFilters(); renderMain(); renderShared(); }
    else if (action === 'compare') go('comparar');
    else if (action === 'assistant') go('asistente');
    else if (action === 'explore') go('explorar');
    else if (action === 'sources') go('fuentes');
    else if (action === 'close-dialog') $('#detail-dialog').close();
    else if (action === 'next') { if (!assistant[questionOptions[assistant.step].key]) return; if (assistant.step < 2) assistant.step++; else assistant.complete = true; renderMain(); $('#main').focus({ preventScroll: true }); }
    else if (action === 'back' && assistant.step > 0) { assistant.step--; renderMain(); }
    else if (action === 'restart') { assistant = { step: 0, project: '', data: '', preference: '', sensitive: false, complete: false }; renderMain(); }
    else if (action === 'compare-recommended') { selected = recommend(assistant).ids.slice(0, 3); filters = emptyFilters(); renderFilters(); go('comparar'); }
  }
});
document.addEventListener('input', event => {
  if (event.target.id === 'platform-search') { filters.search = event.target.value; renderMain(true); renderShared(); }
});
document.addEventListener('change', event => {
  const el = event.target;
  if (el.dataset.filter) { filters[el.dataset.filter] = el.value; renderMain(); renderShared(); }
  else if (el.dataset.need) { filters.needs = el.checked ? [...filters.needs, el.dataset.need] : filters.needs.filter(k => k !== el.dataset.need); renderMain(); renderShared(); }
  else if (el.dataset.answer) { assistant[el.dataset.answer] = el.value; renderMain(); const radio = document.querySelector(`input[data-answer="${el.dataset.answer}"][value="${el.value}"]`); radio?.focus(); }
  else if (el.id === 'sensitive-data') assistant.sensitive = el.checked;
});
window.addEventListener('hashchange', () => { const hash = location.hash.slice(1); page = ['explorar', 'comparar', 'asistente', 'fuentes'].includes(hash) ? hash : 'explorar'; if (dataset) { renderMain(); renderShared(); window.scrollTo({ top: 0, behavior: 'smooth' }); $('#main').focus({ preventScroll: true }); } });
document.addEventListener('keydown', event => { if (event.key === '/' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName) && !$('#detail-dialog').open) { event.preventDefault(); if (page !== 'explorar') go('explorar'); setTimeout(() => $('#platform-search')?.focus(), 30); } });
$('#detail-dialog').addEventListener('click', event => { if (event.target === $('#detail-dialog')) { const bounds = event.target.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.target.close(); } });

try {
  const response = await fetch('./data.json');
  if (!response.ok) throw new Error('No fue posible cargar los datos.');
  dataset = await response.json();
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'mobile-filter-toggle';
  mobileToggle.dataset.action = 'mobile-filters';
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.setAttribute('aria-controls', 'filter-controls');
  $('.sidebar').prepend(mobileToggle);
  renderFilters(); renderMain(); renderShared();
} catch (error) {
  $('#page-content').innerHTML = `<div class="empty-state"><h1>No pudimos cargar las plataformas.</h1><p>Comprueba la conexión y vuelve a cargar la página.</p><button class="secondary-button" id="retry-load">Reintentar</button></div>`;
  $('#retry-load').addEventListener('click', () => location.reload());
  console.error(error);
}
