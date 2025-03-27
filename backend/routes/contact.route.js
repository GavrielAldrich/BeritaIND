import fetchNews  from "../api/fetchNews.api.js";
import getCurrentDateDetails from "../utils/dateUtils.js";

// Contact route
export default async function contactRouter(req, res) {
  try {
    const { nasionalData } = await fetchNews.allNews();
    const randIndex3 = Math.floor(Math.random() * 96);

    const { day, month, thisYear, dayNum } = getCurrentDateDetails.get();

    return res.render("contact_us.ejs", {
      apiEndpoints: fetchNews.API_ENDPOINTS,
      nasionalContent: nasionalData,
      index3: randIndex3,
      currentDate: `${day}, ${dayNum} ${month} ${thisYear}`,
    });
  } catch (error) {
    console.error(error)
    console.log("Error on /contact")
    return res.status(500).send("Error 500 /contact")
  }
}
