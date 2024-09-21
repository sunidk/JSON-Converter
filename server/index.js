const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./api/router"); 
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/api", router);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
