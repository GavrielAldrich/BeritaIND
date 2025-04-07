import fetchNews from "../api/fetchNews.api.js";
import getCurrentDateDetails from "../utils/dateUtils.js";
import cache from "../utils/cache.js";

class ContactController {
  constructor() {
    this.renderContact = this.renderContact.bind(this);
    this.generateRandomIndex = this.generateRandomIndex.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  generateRandomIndex() {
    try {
      return Math.floor(Math.random() * 96);
    } catch (error) {
      console.error("Error generating random index:", error);
      return 0;
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

  async renderContact(req, res) {
    try {
      var cachedContactData = cache.get("contactData");
      if (cachedContactData) {
        return res.render("contact_us.ejs", cachedContactData);
      }

      const { nasionalData } = await fetchNews.allNews();

      if (!nasionalData || !nasionalData.length) {
        throw new Error("No data received from news API");
      }

      const contactData = {
        apiEndpoints: fetchNews.API_ENDPOINTS,
        nasionalContent: nasionalData,
        index3: this.generateRandomIndex(),
        currentDate: this.getCurrentDate(),
      };

      cache.set("contactData", contactData);
      return res.render("contact_us.ejs", contactData);
    } catch (error) {
      console.error("Error in contact route:", error);
      return res.status(500).send("Error 500 /contact");
    }
  }
}

export default new ContactController();
