import fetchNews from "../api/fetchNews.api.js";
import getCurrentDateDetails from "../utils/dateUtils.js";

// Home Routes
export default async function homeRouter(req, res) {
  try {
    const { defaultData, nasionalData, internasionalData } =
      await fetchNews.allNews();

    const randIndex = Math.floor(Math.random() * 95);
    const randIndex2 = Math.floor(Math.random() * 89);
    const randIndex3 = Math.floor(Math.random() * 96);

    const newDate = defaultData[randIndex].isoDate;
    const dateObject = new Date(newDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const randFormattedDate = dateObject.toLocaleDateString("en-US", options);

    const { day, month, thisYear, dayNum } = getCurrentDateDetails.get();

    return res.render("index.ejs", {
      apiEndpoints: fetchNews.API_ENDPOINTS,
      allContent: defaultData,
      nasionalContent: nasionalData,
      internasionalContent: internasionalData,
      index: randIndex,
      index2: randIndex2,
      index3: randIndex3,
      randDateContent: randFormattedDate,
      currentDate: `${day}, ${dayNum} ${month} ${thisYear}`,
    });
  } catch (error) {
    console.error(error);
    console.log("Error on /");
    return res.status(500).send("Error 500 /");
  }
}