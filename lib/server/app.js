import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Routers
app.use(express.static("public"));

export default app;
