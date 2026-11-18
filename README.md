# Deployment Explorer

Aplicación estática e interactiva en español, construida a partir de `Deployment_Explorer_Datos_y_Dashboard.md`. Interfaz oscura con acentos turquesa, visualización de partículas y diseño adaptable a escritorio, tablet y móvil.

## Iniciar

Se requiere Node.js 20 o posterior. No hay dependencias que instalar.

En Windows, también puedes abrir `Iniciar.cmd` y mantener su ventana abierta mientras utilizas la aplicación.

```powershell
cd deployment-explorer
node server.mjs
```

Abre http://localhost:4175. Puedes usar `npm run dev` si tienes npm instalado. Para cambiar el puerto: `$env:PORT = '4200'; node server.mjs`.

## Comprobar

```powershell
node --test tests/model.test.mjs
```

## Funciones

- Seis plataformas con fichas completas y enlaces a fuentes oficiales.
- Búsqueda, categorías y filtros combinables de proyecto, capacidades, costo y administración.
- Selección de hasta tres plataformas y comparación detallada. Quitar selecciones conserva los filtros.
- Matriz interactiva, barras apiladas de integración, perfiles de crecimiento y tarjetas de costos. Los filtros se comparten entre las visualizaciones.
- Asistente de tres preguntas con razones y alternativas. Si se indican datos sensibles o requisitos empresariales, solicita revisión previa y no recomienda automáticamente una plataforma.
- Filtros desplegables en móvil, navegación con teclado, paneles modales, estados vacíos y soporte de movimiento reducido.

## Archivos y actualización

- `dist/data.json`: copia exacta del bloque JSON original, incluidos los estados y las advertencias. Actualiza aquí los datos y la fecha de verificación al realizar una nueva revisión.
- `specification.md`: copia de la especificación original para conservar el contexto y comprobar los datos.
- `dist/model.js`: matriz adicional de la sección 4, filtros y reglas de orientación. Los registros técnicos y la auditoría tienen estados distintos según esa matriz.
- `dist/sources.js`: enlaces oficiales, resúmenes editoriales y precios destacados basados en el documento. Actualiza los resúmenes de precios junto con el JSON.
- `dist/app.js`: interacción e interfaz.
- `dist/styles.css`: identidad visual y adaptación responsive.
- `server.mjs`: servidor de desarrollo local, limitado a 127.0.0.1.

La aplicación consulta los datos al cargar; no realiza llamadas de IA, no necesita claves y no guarda información personal. La tipografía de Google Fonts es opcional: si no se puede cargar, usa las fuentes del sistema. Todo el código, los gráficos y los iconos se sirven localmente.

Las selecciones y respuestas duran durante la sesión de la página. Los perfiles de proyecto y las preferencias de administración son reglas orientativas de adecuación, no promesas de compatibilidad o rankings. Los filtros por capacidades admiten estados con configuración, límites y condiciones; el filtro de libertad tecnológica exige el estado `included`. Todas las opciones pueden conectar servicios externos, incluso mediante una API desde el navegador. Los planes gratuitos conservan sus restricciones comerciales y de producción en las fichas y en costos.

## Publicación

El directorio `dist/` puede alojarse como sitio estático sin compilación. Debe servirse mediante HTTP; abrir `index.html` directamente como `file://` impide cargar el JSON en algunos navegadores.

La conexión de ChatGPT Sites no estuvo disponible al construir esta versión; no se creó un Site ni se confirmó una publicación remota.

Verificación de datos del documento: 18 de noviembre de 2026. Esta demostración educativa no sustituye una evaluación técnica, legal, contractual o de seguridad.
