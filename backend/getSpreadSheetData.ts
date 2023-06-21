import {google} from "googleapis";
import connection from "./database";
const keys = require("./keys.json");

const getSpreadSheetData = async () => {
  const client = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  return new Promise((resolve, reject) => {
    client.authorize((err: Error | null, tokens: any) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("Connected to Google Sheets API!");
        getData(client).then(resolve).catch(reject);
      }
    });
  });
};

const getData = (client: any) => {
  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });
  const options = {
    spreadsheetId: "1b3az54K2-P1BEB0IVdQ4Ces9a3NHsrlKqtxzeJuJnU0",
    range: "voca_app!A1:B10",
  };

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(options, (err: any, res: any) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("Data:", res.data.values);
        insertDataIntoDatabase(res.data.values);
        resolve(res.data.values);
      }
    });
  });
};

const insertDataIntoDatabase = (data: any[]) => {
  const query =
    "INSERT INTO quiz (question, answer) VALUES (?, ?) ON DUPLICATE KEY UPDATE question=VALUES(question), answer=VALUES(answer);";

  data.forEach(([question, answer]) => {
    connection.query(
      query,
      [question, answer],
      (err: any, result: {affectedRows: string}) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Number of records inserted: " + result.affectedRows);
        }
      }
    );
  });
};

module.exports = getSpreadSheetData;
