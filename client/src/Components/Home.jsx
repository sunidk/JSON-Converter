import React, { useState } from "react";
import axios from "axios";
import API from "../routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const downloadFile = (response, filename) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertIntoExcel = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const response = await axios.post(API.JSON_TO_EXCEL, jsonData, {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        });

        downloadFile(response, "Output.xlsx");
        toast.success("File converted to Excel and downloaded successfully!");
      } catch (error) {
        console.error("Error converting file to Excel: ", error);
        toast.error("Error converting file to Excel.");
      }
    };

    reader.readAsText(file);
  };

  const convertIntoCsv = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const response = await axios.post(API.JSON_TO_CSV, jsonData, {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        });

        downloadFile(response, "Output.csv");
        toast.success("File converted to CSV and downloaded successfully!");
      } catch (error) {
        console.error("Error converting file to CSV: ", error);
        toast.error("Error converting file to CSV.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <img src="./json.png" alt="Logo" style={{ width: "50px", height: "auto" }} />
      <div className="main-div">
        <h1>JSON CONVERTER</h1>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept=".json"
        />
        <label htmlFor="file-upload">Select File</label>
        <div className="btn-div">
          <button onClick={convertIntoExcel}>Convert into Excel</button>
          <button onClick={convertIntoCsv}>Convert into CSV</button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Home;
