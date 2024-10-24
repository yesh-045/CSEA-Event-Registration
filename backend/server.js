import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoose from "./config/db.js";
import homeRoute from "./routes/homeRoute.js";
import registerRoute from "./routes/codeRush/codeRushRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/register", registerRoute)


connectMongoose();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
