# Relevamiento de datos — Municipalidad de Hurlingham

Formulario web simple para cargar datos en el campo y que se sincronicen automáticamente con una hoja de Google Sheets.

## Puesta en marcha (una sola vez)

1. **Crear la planilla**: abrí Google Sheets y creá una hoja nueva (ej. "Relevamientos").
2. **Conectar el script**: en la hoja, andá a `Extensiones > Apps Script`, borrá el contenido por defecto y pegá el código de `apps-script.gs`.
3. **Publicar el script**: `Implementar > Nueva implementación > Tipo: Aplicación web`.
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier usuario**
   - Copiá la URL que te da (termina en `/exec`).
4. **Conectar el formulario**: abrí `index.html`, buscá la línea:
   ```js
   const SHEET_WEBHOOK_URL = "";
   ```
   y pegá ahí la URL del paso anterior.
5. **Subir a GitHub**: subí `index.html` a tu repositorio y activá GitHub Pages (`Settings > Pages > Deploy from branch`). Ese va a ser el link que usen para cargar datos desde el celular.

## Personalizar colores y logo

En `index.html`, al principio del `<style>`, están las variables:
```css
--primary: ...     /* azul institucional */
--primary-dark: ...
--accent: ...       /* color de acento del logo */
```
Reemplazalas por los hex exactos del logo municipal. El recuadro "MH" del header se puede cambiar por un `<img>` con el logo real.

## Cómo funciona

- Cada carga se guarda en el celular/navegador (funciona sin internet) y, si hay conexión y la URL está configurada, se envía a la planilla.
- Botón **Exportar CSV** para bajar todo lo cargado en ese dispositivo y abrirlo en Excel/Sheets manualmente si hace falta.
- Desde la planilla, los gráficos se arman con `Insertar > Gráfico` sobre las columnas cargadas (barrio, tipo, fecha, etc.).

## Campos actuales del formulario (registro persona por persona)

Cada carga es **un usuario controlado**, no un total del día:

- Fecha, horario y responsable del control
- Nombre y apellido (o iniciales/DNI) del usuario
- Edad y sexo (opcional)
- Presión arterial en un solo campo (ej: "150/95")
- Resultado automático: "Normal" o "Alterada" (≥ 140/90) — el formulario lo calcula solo
- ¿Tiene antecedentes familiares de hipertensión? (Sí/No)
- ¿Se derivó a la persona a Medicina General? (se sugiere automáticamente "Sí" si la TA está alterada, pero se puede editar)
- Observaciones

## Calcular los indicadores de la Matriz a partir de estos registros

Con los datos cargados persona por persona, en una segunda hoja del mismo Google Sheet se pueden armar los indicadores con fórmulas simples, por ejemplo:

- **Cobertura de tamizaje**: `=CONTAR(Hoja1!A:A) / total de asistentes en sala de espera`
- **Tasa de hallazgos con TA elevada**: `=CONTAR.SI(Hoja1!I:I;"Alterada") / CONTAR(Hoja1!I:I)`
- **Efectividad de derivación**: `=CONTAR.SI(Hoja1!J:J;"Sí") / CONTAR.SI(Hoja1!I:I;"Alterada")`

Si querés, te armo esa segunda hoja con las fórmulas ya cargadas — decime y la sumo.
