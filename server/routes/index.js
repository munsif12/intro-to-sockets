const express = require("express");
const Router = express.Router();
Router.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello from the other side" });
});
module.exports = Router;