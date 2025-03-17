require("dotenv").config();
const express = require("express");
const app = express();
const apiRoute = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
