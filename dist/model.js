export const capabilityRows = [
  { key: 'domain', label: 'Dominio propio', path: 'custom_domain' },
  { key: 'access', label: 'Acceso privado', path: 'access_control' },
  { key: 'users', label: 'Usuarios y contraseñas', path: 'backend_components.user_accounts' },
  { key: 'data', label: 'Guardar información', path: 'backend_components.database' },
  { key: 'files', label: 'Guardar documentos', path: 'backend_components.file_storage' },
  { key: 'tasks', label: 'Procesos automáticos', path: 'backend_components.background_work' },
  { key: 'logs', label: 'Registro de actividad', path: 'activity_records' },
  { key: 'audit', label: 'Auditoría de negocio', path: 'activity_records' },
  { key: 'code', label: 'Código portable', path: 'code_and_portability' },
  { key: 'flex', label: 'Libertad de tecnología', path: 'technology_flexibility' },
  { key: 'security', label: 'Seguridad de infraestructura', path: 'security' }
];
const matrixOverrides = {
  logs: { chatgpt_sites: 'limited', lovable: 'included', vercel: 'included', github_pages: 'not_native', render: 'included', cloudflare: 'included' },
  audit: { chatgpt_sites: 'limited', lovable: 'conditional', vercel: 'conditional', github_pages: 'not_native', render: 'external', cloudflare: 'external' },
  flex: { chatgpt_sites: 'limited', lovable: 'limited', vercel: 'included', github_pages: 'limited', render: 'included', cloudflare: 'limited' }
};
export function capability(platform, key) {
  const row = capabilityRows.find(r => r.key === key);
  const item = row.path.split('.').reduce((value, part) => value?.[part], platform);
  return { ...item, status: matrixOverrides[key]?.[platform.id] || item?.status, matrixOverride: Boolean(matrixOverrides[key]) };
}
export const projectTypes = [
  { value: '', label: 'Todos los tipos de proyecto' },
  { value: 'static', label: 'Página o micrositio', ids: ['github_pages', 'cloudflare', 'vercel'] },
  { value: 'light', label: 'Herramienta ligera', ids: ['chatgpt_sites', 'lovable', 'vercel', 'cloudflare'] },
  { value: 'internal', label: 'Aplicación interna', ids: ['chatgpt_sites', 'lovable', 'vercel', 'render', 'cloudflare'] },
  { value: 'data', label: 'Aplicación con usuarios y datos', ids: ['lovable', 'vercel', 'render', 'cloudflare', 'chatgpt_sites'] },
  { value: 'saas', label: 'Producto SaaS', ids: ['lovable', 'vercel', 'render', 'cloudflare'] },
  { value: 'global', label: 'Alto tráfico o alcance global', ids: ['vercel', 'cloudflare'] }
];
export const costOptions = [
  { value: '', label: 'Cualquier modelo de costo' },
  { value: 'free', label: 'Empezar gratis', ids: ['lovable', 'vercel', 'github_pages', 'render', 'cloudflare'] },
  { value: 'subscription', label: 'Suscripción mensual', ids: ['chatgpt_sites', 'lovable', 'vercel', 'render', 'cloudflare'] },
  { value: 'usage', label: 'Pago según consumo', ids: ['chatgpt_sites', 'lovable', 'vercel', 'render', 'cloudflare'] },
  { value: 'enterprise', label: 'Plan empresarial', ids: ['chatgpt_sites', 'lovable', 'vercel'] }
];
export const managementOptions = [
  { value: '', label: 'Sin preferencia' },
  { value: 'minimal', label: 'Lo mínimo posible', ids: ['chatgpt_sites', 'lovable', 'github_pages'] },
  { value: 'some', label: 'Algunos servicios por separado', ids: ['vercel', 'render', 'cloudflare'] },
  { value: 'control', label: 'Mayor control de los componentes', ids: ['vercel', 'render'] }
];
export const emptyFilters = () => ({ search: '', project: '', cost: '', management: '', needs: [], category: 'all' });
export const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function filterPlatforms(platforms, filters) {
  return platforms.filter(p => {
    const haystack = normalize([p.name, p.category, p.purpose, ...p.ideal_for, ...p.fit_tags].join(' ')).replaceAll('_', ' ');
    if (filters.search && !normalize(filters.search).split(/\s+/).every(term => haystack.includes(term))) return false;
    for (const [key, options] of [['project', projectTypes], ['cost', costOptions], ['management', managementOptions]]) {
      const option = options.find(o => o.value === filters[key]);
      if (option?.ids && !option.ids.includes(p.id)) return false;
    }
    if (filters.category === 'create' && !['chatgpt_sites', 'lovable'].includes(p.id)) return false;
    if (filters.category === 'publish' && !['vercel', 'github_pages', 'render', 'cloudflare'].includes(p.id)) return false;
    if (filters.category === 'global' && !['vercel', 'cloudflare'].includes(p.id)) return false;
    return filters.needs.every(key => key === 'connect' ? true : key === 'flex' ? capability(p, key).status === 'included' : capability(p, key).status !== 'not_native');
  });
}
export function integrationCounts(platform) {
  const counts = { included: 0, configurable: 0, external: 0, limited: 0 };
  Object.values(platform.backend_components).forEach(item => {
    const group = ['included', 'configurable', 'external'].includes(item.status) ? item.status : 'limited';
    counts[group]++;
  });
  return counts;
}
export function toggleSelection(selected, id) {
  if (selected.includes(id)) return { selected: selected.filter(x => x !== id) };
  if (selected.length >= 3) return { selected, error: 'Puedes comparar hasta 3 plataformas. Quita una para añadir otra.' };
  return { selected: [...selected, id] };
}
export const safetyNotice = 'Antes de publicar, valida el plan, el tratamiento de datos, la ubicación, los permisos, la autenticación, los registros y las políticas de TI de tu organización';
export function recommend({ project, data, preference, sensitive }) {
  if (sensitive || data === 'enterprise') return { reviewRequired: true, ids: [], reason: safetyNotice + '.' };
  if (project === 'global') return { ids: ['cloudflare', 'vercel'], reason: 'Tu proyecto necesita llegar a usuarios en distintos países. Estas plataformas ofrecen distribución global; revisa los límites y los servicios que requiere tu aplicación.' };
  if (preference === 'control') return { ids: ['render', 'vercel'], reason: 'Prefieres decidir cómo funciona cada componente. Render permite servicios continuos y bases de datos separadas; Vercel facilita publicar aplicaciones web y conectar proveedores.' };
  if (preference === 'connect') return { ids: ['vercel', 'render'], reason: 'Quieres elegir y conectar servicios. Estas opciones permiten organizar tu aplicación y conservar el código en tu propio repositorio.' };
  if (data !== 'none') return { ids: ['lovable', project === 'internal' ? 'chatgpt_sites' : 'vercel'], reason: 'Necesitas usuarios e información guardada y prefieres una solución integrada. Lovable reúne datos, cuentas, archivos y tareas. Revisa el plan, los permisos y el consumo adicional.' };
  if (project === 'internal') return { ids: ['chatgpt_sites', 'lovable'], reason: 'Para una herramienta interna ligera, Sites permite crear y compartir desde ChatGPT. Lovable es una alternativa si necesitas ampliar la gestión de usuarios y datos. Valida quién puede entrar.' };
  if (project === 'simple') return { ids: ['github_pages', 'cloudflare', 'vercel'], reason: 'Una página pública sin gestión de usuarios ni datos puede publicarse como sitio estático. Revisa los usos permitidos: Vercel Hobby es personal y no comercial; GitHub Pages tiene restricciones para aplicaciones transaccionales.' };
  return { ids: ['lovable', 'vercel'], reason: 'Para un producto digital, explora Lovable si prefieres servicios integrados o Vercel si quieres elegir las piezas de tu aplicación. El costo depende del uso y del plan.' };
}
