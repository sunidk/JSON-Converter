const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");

exports.convertJsonData = (req, res) => {
  const jsonData = req.body;
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(jsonData);
    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="Output.csv"');

    res.send(csv);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error converting JSON to CSV" });
  }
};

exports.convertJsonIntoExcel = async (req, res) => {
  const jsonData = req.body;
  try {
    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    const columns = Object.keys(jsonData[0]).map((key) => ({
      header: key,
      key,
    }));

    worksheet.columns = columns;
    jsonData.forEach((data) => worksheet.addRow(data));

    res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", 'attachment; filename="Output.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error converting JSON to Excel" });
  }
};
