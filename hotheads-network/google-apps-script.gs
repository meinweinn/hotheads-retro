const SPREADSHEET_URL =
  'https://docs.google.com/spreadsheets/d/1aJLUj6DDrRk3tBRUsHOdwS7D3qy91yMsnXJwVKMTprk/edit?usp=sharing';
const SHEET_NAME = 'Sheet1';

function getTargetSheet_() {
  const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
}

function doGet() {
  const sheet = getTargetSheet_();
  return ContentService
    .createTextOutput(
      JSON.stringify({
        ok: true,
        sheet: sheet ? sheet.getName() : null,
        spreadsheet: SPREADSHEET_URL,
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getTargetSheet_();

    if (!sheet) {
      throw new Error('No writable sheet found');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Telegram Username',
        'Twitter Username',
        'Wallet Address',
        'Twitter Follow Confirm',
      ]);
    }

    sheet.appendRow([
      new Date(),
      payload.telegram || '',
      payload.twitter || '',
      payload.wallet || '',
      payload.twitter_follow_confirm ? 'Yes' : 'No',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
