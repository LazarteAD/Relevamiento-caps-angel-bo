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

  // Si la hoja está vacía, agrega encabezados
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['fecha','relevador','barrio','direccion','tipo','obs','lat','lng','timestamp']);
  }

  sheet.appendRow([
    data.fecha, data.relevador, data.barrio, data.direccion,
    data.tipo, data.obs, data.lat, data.lng, data.timestamp
  ]);

  return ContentService.createTextOutput(JSON.stringify({status: 'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
