import fetchNews from "../api/fetchNews.api.js";
import getCurrentDateDetails from "../utils/dateUtils.js";

class HomeController {
  constructor() {
    // Bind methods to preserve 'this' context
    this.index = this.index.bind(this);
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
      console.error('Error generating random indices:', error);
      return {
        index: 0,
        index2: 0,
        index3: 0
      };
    }
  }

  formatDate(data) {
    try {
      if (!data || !data.isoDate) {
        throw new Error('Invalid data for date formatting');
      }
      const dateObject = new Date(data.isoDate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return dateObject.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return new Date().toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });
    }
  }

  getCurrentDate() {
    try {
      const { day, month, thisYear, dayNum } = getCurrentDateDetails.get();
      return `${day}, ${dayNum} ${month} ${thisYear}`;
    } catch (error) {
      console.error('Error getting current date:', error);
      return new Date().toLocaleDateString();
    }
  }

  async index(req, res) {
    try {
      const { defaultData, nasionalData, internasionalData } =
        await fetchNews.allNews();

      if (!defaultData || !defaultData.length) {
        throw new Error('No data received from news API');
      }

      const randomIndices = this.generateRandomIndices();
      const formattedDate = this.formatDate(defaultData[randomIndices.index]);
      const currentDate = this.getCurrentDate();

      return res.render("index.ejs", {
        apiEndpoints: fetchNews.API_ENDPOINTS,
        allContent: defaultData,
        nasionalContent: nasionalData,
        internasionalContent: internasionalData,
        ...randomIndices,
        randDateContent: formattedDate,
        currentDate,
      });
    } catch (error) {
      console.error("Error in index route:", error);
      return res.status(500).send("Error 500 /");
    }
  }
}

// Create and export a single instance
export default new HomeController();