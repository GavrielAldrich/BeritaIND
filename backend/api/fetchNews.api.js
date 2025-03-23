import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// API Links endpoints
const CNN_API = process.env.API;

const API_ENDPOINTS = {
  nasional: "Nasional",
  internasional: "Internasional",
  ekonomi: "Ekonomi",
  olahraga: "Olahraga",
  teknologi: "Teknologi",
  hiburan: "Hiburan",
  "gaya-hidup": "Gaya Hidup",
};
const keys = Object.keys(API_ENDPOINTS);

// Use Promise.all to make multiple API requests accessible.
const fetchNews = async () => {
  const [allCNN, nasionalCNN, internasionalCNN] = await Promise.all([
    axios.get(CNN_API).catch((err) => {
      console.error("Route:", CNN_API);
      throw Error("Error when fetching all CNN API.");
    }),
    ...keys.map((key) =>
      axios.get(CNN_API + key).catch((err) => {
        console.error("Route:", CNN_API, key);
        throw Error("Error when fetching CNN API based on endpoints");
      })
    ),
  ]);

  return {
    defaultData: allCNN.data.data,
    nasionalData: nasionalCNN.data.data,
    internasionalData: internasionalCNN.data.data,
  };
};

export { fetchNews, API_ENDPOINTS };
