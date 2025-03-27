import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class FetchNews {
  constructor() {
    this.CNN_API = process.env.API;
    this.API_ENDPOINTS = {
      nasional: "Nasional",
      internasional: "Internasional",
      ekonomi: "Ekonomi",
      olahraga: "Olahraga",
      teknologi: "Teknologi",
      hiburan: "Hiburan",
      "gaya-hidup": "Gaya Hidup",
    };
  }
  async allNews() {
    const keys = Object.keys(this.API_ENDPOINTS);

    const [allCNN, nasionalCNN, internasionalCNN] = await Promise.all([
      axios.get(this.CNN_API).catch((err) => {
        console.error("Route:", this.CNN_API);
        throw Error("Error when fetching all CNN API.");
      }),

      ...keys.map((key) =>
        axios.get(this.CNN_API + key).catch((err) => {
          console.error("Route:", this.CNN_API, key);
          throw Error("Error when fetching CNN API with endpoints");
        })
      ),
    ]);

    return {
      defaultData: allCNN.data.data,
      nasionalData: nasionalCNN.data.data,
      internasionalData: internasionalCNN.data.data,
    };
  }
  async filteredNews(q) {
    const filteredCNN = axios.get(this.CNN_API + q);
    return filteredCNN;
  }
}

export default new FetchNews();
