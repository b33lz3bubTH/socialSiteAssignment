import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import Mongoose from 'mongoose';
import Config from "./config";
import Routes from "./api";
import { errors } from 'celebrate';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", ...Routes)

app.use(errors());

Mongoose.connect(Config.mongoURI).then((connnecion) => {
  app.listen(Config.port, () => {
    console.log(`application is running on port ${Config.port}.`);
  });
});