/**
 * Pegar este código en: Google Sheets > Extensiones > Apps Script
 * Luego: Implementar > Nueva implementación > Tipo "Aplicación web"
 *   - Ejecutar como: Yo
 *   - Quién tiene acceso: Cualquier usuario
 * Copiar la URL resultante y pegarla en SHEET_WEBHOOK_URL dentro de index.html
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Si la hoja está vacía, agrega encabezados (un registro por persona)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Fecha','Horario','Responsable','Nombre/Iniciales','Edad','Sexo',
      'TA Sistolica','TA Diastolica','Resultado (Normal/Alterada)',
      'Derivacion Protegida Asignada','Asistio Modulo Movimiento',
      'Observaciones','timestamp'
    ]);
  }

  sheet.appendRow([
    data.fecha, data.horario, data.responsable, data.nombrePersona,
    data.edad, data.sexo, data.sistolica, data.diastolica, data.resultado,
    data.derivacion, data.asistioMov, data.observaciones, data.timestamp
  ]);

  return ContentService.createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
