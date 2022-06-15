import cookieParser from "cookie-parser";
import express, { Express } from "express";
import router from "../routes";

// expressjs app
const app: Express = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/src", express.static("src"));
app.use("/node_modules", express.static("node_modules"));
app.use("/dist", express.static("dist"));
app.use("/", router);

export default app;
