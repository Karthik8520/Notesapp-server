const express = require("express");
const cors = require("cors");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/user");
const app = require("./server");


app.use(express.json());
app.use(cors());
app.use("/notesapp/v1/notes", notesRouter)
app.use("/notesapp/v1/", userRouter)

module.exports = app;