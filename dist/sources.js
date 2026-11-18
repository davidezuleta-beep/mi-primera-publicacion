export const sources = {
  openai_sites: ['Crear y usar ChatGPT Sites', 'https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites'],
  openai_sites_workspace: ['Administrar Sites en tu espacio de trabajo', 'https://help.openai.com/es-419/articles/20001338-managing-chatgpt-sites-for-your-workspace'],
  openai_sites_responsibilities: ['Responsabilidades al usar Sites', 'https://help.openai.com/es-419/articles/20001337-understanding-responsibilities-for-your-chatgpt-sites'],
  lovable_backend: ['Backend integrado', 'https://docs.lovable.dev/features/cloud'],
  lovable_github: ['Sincronización con GitHub', 'https://docs.lovable.dev/integrations/github'],
  lovable_domains: ['Dominios personalizados', 'https://docs.lovable.dev/features/custom-domain'],
  lovable_pricing: ['Planes y precios', 'https://lovable.dev/pricing'],
  vercel_pricing: ['Planes y precios', 'https://vercel.com/pricing'],
  vercel_deployment_protection: ['Protección de publicaciones', 'https://vercel.com/docs/deployment-protection'],
  vercel_firewall: ['Firewall y protección', 'https://vercel.com/docs/vercel-firewall'],
  vercel_domains: ['Configurar dominio propio', 'https://vercel.com/docs/domains/set-up-custom-domain'],
  vercel_plans: ['Planes de cuenta', 'https://vercel.com/docs/plans'],
  github_pages_about: ['Qué es GitHub Pages', 'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages'],
  github_pages_limits: ['Límites de GitHub Pages', 'https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits'],
  github_pages_domains: ['Dominios personalizados', 'https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages'],
  render_web_services: ['Servicios web', 'https://render.com/docs/web-services'],
  render_free: ['Plan gratuito y límites', 'https://render.com/docs/free'],
  render_pricing: ['Planes y precios', 'https://render.com/pricing'],
  render_first_deploy: ['Tu primera publicación', 'https://render.com/docs/your-first-deploy'],
  cloudflare_workers_pricing: ['Precios de Workers', 'https://developers.cloudflare.com/workers/platform/pricing/'],
  cloudflare_workers_limits: ['Límites de Workers', 'https://developers.cloudflare.com/workers/platform/limits/'],
  cloudflare_storage: ['Datos y almacenamiento', 'https://developers.cloudflare.com/workers/platform/storage-options/'],
  cloudflare_access: ['Control de acceso', 'https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/'],
  cloudflare_git: ['Integración Git de Pages', 'https://developers.cloudflare.com/pages/configuration/git-integration/'],
  cloudflare_custom_domains: ['Dominios de Pages', 'https://developers.cloudflare.com/pages/configuration/custom-domains/']
};
export const prices = {
  chatgpt_sites: { amount: 'En tu plan', unit: 'ChatGPT elegible', note: 'Plus, Pro, Business o Enterprise', free: 'Requiere un plan elegible. Alojamiento, tráfico y almacenamiento tienen límites propios.', source: 'openai_sites' },
  lovable: { amount: '$0', unit: 'para empezar', note: 'Pro $25/mes · Business $50/mes', free: 'El uso de Cloud e IA consume créditos. Un mayor volumen puede requerir créditos adicionales.', source: 'lovable_pricing' },
  vercel: { amount: '$20', unit: '/mes · Pro desde', note: 'Hobby $0 · Solo personal, no comercial', free: 'Hobby no permite uso comercial ni aplicaciones de la organización. Pro incluye $20 de crédito de uso.', source: 'vercel_pricing' },
  github_pages: { amount: '$0', unit: 'repositorios públicos', note: 'Con GitHub Free', free: 'Repositorios privados requieren un plan compatible. No alojar SaaS, comercio electrónico ni aplicaciones transaccionales.', source: 'github_pages_limits' },
  render: { amount: '≈ $7', unit: '/mes · servicio web', note: 'Gratis para pruebas', free: 'Las instancias gratuitas son para pruebas y no se recomiendan para producción.', source: 'render_pricing' },
  cloudflare: { amount: '$5', unit: '/mes · Workers Paid desde', note: 'Free: 100.000 solicitudes/día', free: 'Workers Free tiene un límite de 100.000 solicitudes al día. D1 y R2 tienen cuotas y precios propios.', source: 'cloudflare_workers_pricing' }
};
export const summaries = {
  chatgpt_sites: { description: 'De una conversación a una herramienta interactiva, sin salir de ChatGPT.', tags: ['Herramientas ligeras', 'Dashboards'], type: 'CREAR Y PUBLICAR' },
  lovable: { description: 'Construye tu aplicación con IA, con usuarios, datos y archivos integrados.', tags: ['Apps con usuarios', 'Creación con IA'], type: 'CREAR CON IA' },
  vercel: { description: 'Publica tu aplicación web y conecta los servicios que tu proyecto necesita.', tags: ['Productos web', 'Alto tráfico'], type: 'PUBLICAR Y OPERAR' },
  github_pages: { description: 'Un camino directo para publicar páginas, portafolios y documentación.', tags: ['Páginas estáticas', 'Documentación'], type: 'PUBLICAR PÁGINAS' },
  render: { description: 'Un espacio para tu aplicación, sus datos y los procesos que no se detienen.', tags: ['Servidor propio', 'Procesos continuos'], type: 'APLICACIONES Y SERVICIOS' },
  cloudflare: { description: 'Ejecuta tu aplicación cerca de tus usuarios, a través de una red global.', tags: ['Alcance global', 'Servicios y datos'], type: 'INFRAESTRUCTURA GLOBAL' }
};
