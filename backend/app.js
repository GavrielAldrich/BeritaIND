import dotenv from "dotenv";

import express, { Router } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "../views")));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));



// Helper function to get current date details
const getCurrentDateDetails = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const day = days[d.getDay()];
  const month = months[d.getMonth()];
  const thisYear = d.getFullYear();
  const dayNum = d.getDate();
  return { day, month, thisYear, dayNum };
};

function error500(route) {
  console.error("Errors:", error);
  console.error("Error handling", route);
  return res.status(500).send("Error on server, please retry");
}

app.use(router);

// // Category route
// app.get("/category", async (req, res) => {
//   try {
//     const { nasionalData } = await fetchData();
//     const getID = req.query.id;
//     const response = await axios.get(CNN_default + getID);
//     const result = response.data.data;
//     const headerName = API_endpoints.data[getID];
//     const randIndex3 = Math.floor(Math.random() * 96);

//     // Pagination
//     const pageSize = 5; // Adjust as needed
//     const pageNum = parseInt(req.query.page) || 0;
//     const startIndex = pageNum * pageSize;
//     const endIndex = Math.min(startIndex + pageSize, result.length);

//     const { day, month, thisYear, dayNum } = getCurrentDateDetails();

//     res.render("category.ejs", {
//       apiEndpoints: API_endpoints,
//       nasionalContent: nasionalData,
//       index3: randIndex3,
//       currentDate: `${day}, ${dayNum} ${month} ${thisYear}`,
//       idHeader: headerName,
//       idEndpoints: getID,
//       categoryContent: result.slice(startIndex, endIndex),
//       minContent: startIndex,
//       maxContent: endIndex,
//       pageNum: pageNum,
//     });
//   } catch (error) {
//     error500("/category");
//   }
// });

// app.post("/category", async (req, res) => {
//   const getID = req.query.id;
//   const getName = req.query.name;

//   // Placeholder for categoryIndexArr initialization and logic
//   const categoryIndexArr = [0, 5]; // Initialize with default values

//   if (categoryIndexArr[0] >= 0 && categoryIndexArr[1] < 95) {
//     switch (getName) {
//       case "next":
//         categoryIndexArr[0] += 5;
//         categoryIndexArr[1] += 5;
//         break;
//       case "previous":
//         categoryIndexArr[0] -= 5;
//         categoryIndexArr[1] -= 5;
//         break;
//     }
//   }
//   res.redirect(`/category?id=${getID}&name=${getName}`);
// });

// app.get("/contact", async (req, res) => {
//   try {
//     const { defaultData, nasionalData, internasionalData } = await fetchData();
//     const randIndex3 = Math.floor(Math.random() * 96);

//     const { day, month, thisYear, dayNum } = getCurrentDateDetails();

//     res.render("Contact_us.ejs", {
//       apiEndpoints: API_endpoints,
//       nasionalContent: nasionalData,
//       index3: randIndex3,
//       currentDate: `${day}, ${dayNum} ${month} ${thisYear}`,
//     });
//   } catch (error) {
//     error500("/contact");
//   }
// });

// // Default Route
// app.get("/*", (req, res) => {
//   res.status(404).send("Request not found 404");
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
