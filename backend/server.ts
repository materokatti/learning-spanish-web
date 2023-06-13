import express from "express";
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("Hello World!")
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
