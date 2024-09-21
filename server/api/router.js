const express = require("express");
const { convertJsonData, convertJsonIntoExcel } = require("./controller"); 
const router = express.Router();

router.post("/jsonToCsv", convertJsonData);
router.post("/jsonToExcel", convertJsonIntoExcel);

module.exports = router;
