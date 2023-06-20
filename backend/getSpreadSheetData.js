const { google } = require("googleapis");
const keys = require("./keys.json"); // OAuth 2.0 클라이언트 ID 파일

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err) {
  if (err) {
    console.error("Google Sheets API 연결에 실패했습니다:", err);
    return;
  }
  console.log("Google Sheets API에 성공적으로 연결되었습니다!");
  getData(client);
});

function getData(client) {
  const sheets = google.sheets({ version: "v4", auth: client });
  const options = {
    spreadsheetId: "1b3az54K2-P1BEB0IVdQ4Ces9a3NHsrlKqtxzeJuJnU0",
    range: "voca_app!A1:B10",
  };

  sheets.spreadsheets.values.get(options, function (err, res) {
    if (err) {
      console.error("데이터 가져오기에 실패했습니다:", err);
      return;
    }
    console.log("데이터:", res.data.values);
  });
}
