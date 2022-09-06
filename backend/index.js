import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import Mongoose from 'mongoose';
import Config from "./config";
import Routes from "./api";
import { errors } from 'celebrate';
import cors from "cors";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));
app.use(errors());

app.use("/", ...Routes);
app.use("/images", express.static('./uploads'));
app.use("/ui", express.static('./build'));
app.use("/static", express.static('./build/static'));


Mongoose.connect(Config.mongoURI).then((connnecion) => {
  app.listen(Config.port, () => {
    console.log(`application is running on port ${Config.port}.`);
  });
});
