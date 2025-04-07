import fetchNews from "../api/fetchNews.api.js";
import getCurrentDateDetails from "../utils/dateUtils.js";
import cache from "../utils/cache.js";

class HomeController {
  constructor() {
    this.renderHome = this.renderHome.bind(this);
    this.generateRandomIndices = this.generateRandomIndices.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  generateRandomIndices() {
    try {
      return {
        index: Math.floor(Math.random() * 95),
        index2: Math.floor(Math.random() * 89),
        index3: Math.floor(Math.random() * 96),
      };
    } catch (error) {
      console.error("Error generating random indices:", error);
      return {
        index: 0,
        index2: 0,
        index3: 0,
      };
    }
  }

  formatDate(homeData) {
    try {
      if (!homeData || !homeData.isoDate) {
        throw new Error("Invalid homeData for date formatting");
      }
      const dateObject = new Date(homeData.isoDate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return dateObject.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  getCurrentDate() {
    try {
      const { day, month, thisYear, dayNum } = getCurrentDateDetails.get();
      return `${day}, ${dayNum} ${month} ${thisYear}`;
    } catch (error) {
      console.error("Error getting current date:", error);
      return new Date().toLocaleDateString();
    }
  }

  async renderHome(req, res) {
    var cachedHomeData = cache.get("homeData");
    if (cachedHomeData) {
      return res.render("index.ejs", cachedHomeData);
    }

    const { defaultData, nasionalData, internasionalData } =
      await fetchNews.allNews();

    const randomIndices = this.generateRandomIndices();
    const formattedDate = this.formatDate(defaultData[randomIndices.index]);
    const currentDate = this.getCurrentDate();

    const homeData = {
      apiEndpoints: fetchNews.API_ENDPOINTS,
      allContent: defaultData,
      nasionalContent: nasionalData,
      internasionalContent: internasionalData,
      ...randomIndices,
      randDateContent: formattedDate,
      currentDate,
    };

    cache.set("homeData", homeData);
    return res.render("index.ejs", homeData);
  }
}

// Create and export a single instance
export default new HomeController();
