import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import routes from "./routes/animalsRoutes";

import multer from "multer";
import * as path from "path";

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));
app.use(express.static("./public"));

//! Use of Multer
interface MulterRequest extends Request {
  file: any;
}

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
/////

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/Animals");
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log("Database Connected");
});

app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  res.send((req as MulterRequest).file.filename);
});

app.use("/", routes);

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
