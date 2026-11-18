# Verificación de Deployment Explorer

## Comprobaciones automáticas

Ejecutar `node --test tests/model.test.mjs`: 9 pruebas aprobadas.

- El JSON conserva exactamente la especificación original, incluidas las advertencias.
- Cada capacidad tiene un estado válido y cada fuente tiene un enlace oficial.
- Las barras de integración representan exactamente cuatro capacidades por plataforma.
- La matriz diferencia registros técnicos de auditoría de negocio.
- Los filtros se combinan y se restablecen correctamente.
- La búsqueda ignora mayúsculas y diferencias de acentuación.
- La selección admite un máximo de tres opciones y permite retirar una sin perder las otras.
- Los datos sensibles y requisitos empresariales evitan recomendaciones automáticas.
- Las recomendaciones ofrecen razones y alternativas en todas las combinaciones de respuestas.

## Navegador

Comprobado sobre servidor HTTP local:

- Carga de interfaz y JSON con respuesta HTTP 200.
- Búsqueda por documentación, estado vacío y limpieza de filtros.
- Filtros de SaaS y administración mínima: una tarjeta y un registro en el gráfico.
- Intento de añadir una cuarta plataforma: aviso y selección limitada a tres.
- Comparación detallada, fila de propósito y retirada de una opción conservando el filtro SaaS.
- Apertura de celda de la matriz: explicación, estado y fuentes oficiales.
- Asistente completo: producto con usuarios y servicios integrados devuelve Lovable y Vercel.
- Asistente con información sensible: revisión previa, sin tarjetas de recomendación.
- Filtros en móvil: expansión, elección de alcance global y cierre.
- Gráfico de integración filtrado: Vercel y Cloudflare. Un segmento de Cloudflare muestra datos, archivos y procesos incluidos.
- Crecimiento: seis perfiles de uso respetan el filtro.
- Costos y fuentes: respetan el filtro; limpiar muestra los 25 enlaces oficiales.
- Vistas de tarjetas y lista: seis plataformas en ambas.
- Comprobación de anchuras CSS de 320, 391, 520, 768 y 1707 px: sin desbordamiento horizontal de página. Las tablas tienen su propio desplazamiento horizontal.
- Capturas e inspección visual en escritorio y móvil. En la revisión se corrigieron los contornos de foco, la separación de texto del banner y la legibilidad de las tarjetas móviles.
- Sin errores ni advertencias en la consola durante los flujos comprobados.

La revisión es funcional y visual; no es una auditoría de accesibilidad ni una verificación nueva de los precios del documento.

## Entrega

Sitio estático sin dependencias. La conexión de ChatGPT Sites falló durante el inicio del conector; no se creó ni publicó un Site remoto. El servidor usado para QA es temporal; `Iniciar.cmd` o `node server.mjs` permiten volver a abrir la aplicación localmente.
