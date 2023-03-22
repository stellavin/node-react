require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const corsOption = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOption));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const studentsRouter = require("./router/students");
app.use("/init", studentsRouter);

app.listen(PORT, () => console.log("Server started"));
