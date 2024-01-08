import express from "express";
import cors from "cors";
import db from "./database";
import axios from "axios";
const getSpreadSheetData = require("./getSpreadSheetData");
const app = express();

// JSON 요청 본문 파싱을 위한 미들웨어 추가
app.use(express.json());

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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
      res.status(500).json({ error: "Failed to retrieve spreadsheet data" });
    }
  }
);

app.post(
  "/llama-query",
  async (req: express.Request, res: express.Response) => {
    try {
      const { prompt } = req.body;
      const response = await axios.post(
        "https://api.llama2.example.com/generate",
        {
          model: "llama2",
          prompt,
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error calling Llama 2 API", error });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
