const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");
const newsRoute = require("./routes/newsRoute");

mongoose.connect("mongodb+srv://Mikaelisson:011020@cluster0.twdqh.mongodb.net/news?retryWrites=true&w=majority");

let db = mongoose.connection;

db.on("error", () => {
  console.log("Houve um erro");
});
db.once("open", () => {
  console.log("Banco carregado");
});

app.use(express.static(path.join(__dirname, 'views')))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", newsRoute);
app.use("/files", express.static(path.resolve(__dirname, "tmp", "uploads")));


app.listen(PORT, () => {
  console.log("Server is runing port", PORT);
});
