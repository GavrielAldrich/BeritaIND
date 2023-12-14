import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => { 
    console.log(`Listening to port: ${port}`); 
});

// API Links endpoints
const CNN_default = "https://berita-indo-api-next.vercel.app/api/cnn-news/";
const API_endpoints = {
    data : {
        nasional : "Nasional",
        internasional : "Internasional",
        ekonomi : "Ekonomi",
        olahraga : "Olahraga",
        teknologi : "Teknologi",
        hiburan : "Hiburan",
        "gaya-hidup" : "Gaya Hidup",
    }
};
const keys = Object.keys(API_endpoints.data);

// Use Promise.all to make multiple API requests access able.
const [defaultResp, nasionalResp, internasionalResp,
    ekonomiResp, olahragaResp, teknologiResp,
    hiburanResp, gayaHidupResp] = await Promise.all([
    axios.get(CNN_default),
 ...keys.map(key => axios.get(CNN_default + key)),
]);

const defaultData = defaultResp.data.data;
const internasionalData = internasionalResp.data.data;
const nasionalData = nasionalResp.data.data;

// Making a live date for top left Header
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
const day = days[d.getDay()];
const month = months[d.getMonth()];
const thisYear = d.getFullYear();
const dayNum = d.getDate();

// GET: "/"
app.get("/", async (req, res) => {
    try {
        const randIndex = Math.floor(Math.random() * 95);
        //Make the index2 = 89, so we could get 99 of maximum index instead of 104 index
        const randIndex2 = Math.floor(Math.random() * 89); // On EJS will be 89 + 10
        const randIndex3 = Math.floor(Math.random() * 96); // On EJS will be 96 + 3 

        // Converting the randContent isoDate to Month Date, Year.
        const newDate = defaultData[randIndex].isoDate;
        const dateObject = new Date(newDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const randFormattedDate = dateObject.toLocaleDateString('en-US', options);
        
        res.render("index.ejs", {
            apiEndpoints : API_endpoints,
            allContent : defaultData,
            nasionalContent : nasionalData,
            internasionalContent : internasionalData,
            index : randIndex,
            index2 : randIndex2,
            index3 : randIndex3,
            randDateContent: randFormattedDate,
            currentDate: day + ", " + dayNum + " " + month + " " + thisYear,
        });
    } catch (error) {
        console.log("Error, error type:", error.response.data);
        res.render("index.ejs");
    }
});

// GET: "/category"
app.get("/category", async (req, res) => {
    try {
        const getID = req.query.id;
        console.log(getID)
        const randIndex3 = Math.floor(Math.random() * 96);
        res.render("category.ejs", {
            apiEndpoints : API_endpoints,
            nasionalContent : nasionalData,
            index3 : randIndex3,
            currentDate: day + ", " + dayNum + " " + month + " " + thisYear,
        });
    } catch (error) {
        console.log("Error, error type: "+ error.response.data)
    }
});

// GET: "/contact"
app.get("/contact", async (req, res) => {
    try {
        const getDataID = req.query.id;
        const randIndex3 = Math.floor(Math.random() * 96);
        res.render("Contact_us.ejs", {
            apiEndpoints : API_endpoints,
            nasionalContent : nasionalData,
            index3 : randIndex3,
            currentDate: day + ", " + dayNum + " " + month + " " + thisYear,
        });
    } catch (error) {
        res.render("Contact_us.ejs", {
            currentDate: day + ", " + dayNum + " " + month + " " + thisYear,
        });
    }
});