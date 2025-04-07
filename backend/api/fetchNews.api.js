import axios from "axios";
import dotenv from "dotenv";
import cache from "../utils/cache.js";

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
    this.fetchWithCache = this.fetchWithCache.bind(this);
  }

  async fetchWithCache(key, url) {
    const cachedData = cache.get(key);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(url);
      cache.set(key, response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error while fetching: ${url}`);
    }
  }

  async filteredNews(name) {
    const result = await this.fetchWithCache(
      `news_${name}`,
      `${this.CNN_API}${name}`
    );
    return result;
  }

  async allNews() {
    try {
      const cacheKey = "allNewsData";
      const allCachedData = cache.get(cacheKey);
      if (allCachedData) {
        return allCachedData;
      }

      // Fetch all news
      const allData = await this.fetchWithCache("defaultData", this.CNN_API);

      // Fetch based on category
      const categoryKeys = Object.keys(this.API_ENDPOINTS);
      const categoryRequests = categoryKeys.map((key) => {
        const url = this.CNN_API + key;
        return this.fetchWithCache(key, url);
      });

      const [nasionalData, internasionalData, ...otherCategories] =
        await Promise.all(categoryRequests);

      const allNewsData = {
        defaultData: allData,
        nasionalData,
        internasionalData,
        otherCategories,
      };

      cache.set(cacheKey, allNewsData);
      return allNewsData;
    } catch (error) {
      console.error(error);
      throw new Error("Error while fetcing all news API");
    }
  }
}

export default new FetchNews();
