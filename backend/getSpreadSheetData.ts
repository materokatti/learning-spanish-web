const { google, sheets_v4 } = require("googleapis");
const keys = require("./keys.json"); // OAuth 2.0 클라이언트 ID 파일")

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err: Error, tokens: any) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected to Google Sheets API!");
    getData(client);
  }
});

function getData(client: any) {
  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });
  const options = {
    spreadsheetId: "1b3az54K2-P1BEB0IVdQ4Ces9a3NHsrlKqtxzeJuJnU0", // replace with your spreadsheet ID
    range: "voca_app!A1:B10", // replace with your range: ;
  };

  sheets.spreadsheets.values.get(options, (err: any, res: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data:", res.data.values);
    }
  });
}
