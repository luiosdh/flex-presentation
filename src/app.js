const express = require("express");
const path = require("path");

const app = express();
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/slide-1", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-1.html"));
});

app.get("/slide-2", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-2.html"));
});

app.get("/slide-3", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-3.html"));
});

app.get("/slide-4", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-4.html"));
});

app.get("/slide-5", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-5.html"));
});

app.get("/slide-6", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-6.html"));
});

app.get("/slide-7", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-7.html"));
});

app.get("/slide-8", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-8.html"));
});

app.get("/slide-9", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-9.html"));
});

app.get("/slide-10", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-10.html"));
});

app.get("/slide-11", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-11.html"));
});

app.get("/slide-12", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-12.html"));
});

app.get("/slide-13", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-13.html"));
});

app.get("/slide-14", (req, res) => {
  res.sendFile(path.join(__dirname, "views/slide-14.html"));
});
