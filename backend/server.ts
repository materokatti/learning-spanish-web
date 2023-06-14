import express from "express";
import db from "./database";
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req: express.Request, res: express.Response) => {
  db.query("SELECT * FROM spanish_learning.quiz;", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
