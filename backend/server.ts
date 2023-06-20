import express from "express";
import db from "./database";
const getSpreadSheetData = require("./getSpreadSheetData");
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req: express.Request, res: express.Response) => {
  db.query(
    "SELECT * FROM spanish_learning.quiz;",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results);
    }
  );
});

app.get(
  "/getSpreadSheetData",
  async (req: express.Request, res: express.Response) => {
    try {
      const data = await getSpreadSheetData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error: "Failed to retrieve spreadsheet data"});
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
