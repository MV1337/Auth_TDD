const express = require("express");
const router = express.Router();

router.use("/api/user", require("./UserRoutes"));

router.get("/", (req, res) => {
    res.send("API WORKING");
})

module.exports = router;