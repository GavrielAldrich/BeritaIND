import fetchNews from "../api/fetchNews.api.js";
import getCurrentDateDetails from "../utils/dateUtils.js";
import cache from "../utils/cache.js";

class CategoryRouter {
  async renderCategory(req, res) {
    try {
      const name = req.params.name;
      const pageNum = parseInt(req.query.page) || 1; // Default to page 1 if not provided

      // Fetch data
      const { nasionalData } = await fetchNews.allNews();
      const response = await fetchNews.filteredNews(name);
      const result = response;
      const headerName = fetchNews.API_ENDPOINTS[name];
      const randIndex3 = Math.floor(Math.random() * 96);

      // Pagination logic
      const pageSize = 5; // Items per page
      const totalItems = result.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, totalItems);

      // Current date
      const { day, month, thisYear, dayNum } = getCurrentDateDetails.get();

      // Render the category page
      return res.render("category.ejs", {
        apiEndpoints: fetchNews.API_ENDPOINTS,
        nasionalContent: nasionalData,
        index3: randIndex3,
        currentDate: `${day}, ${dayNum} ${month} ${thisYear}`,
        idHeader: headerName,
        idEndpoints: name,
        categoryContent: result.slice(startIndex, endIndex),
        currentPage: pageNum,
        totalPages,
        nextPageLink:
          pageNum < totalPages ? `/category/${name}?page=${pageNum + 1}` : null,
        prevPageLink:
          pageNum > 1 ? `/category/${name}?page=${pageNum - 1}` : null,
      });
    } catch (error) {
      console.error(error);
      console.log("Error on /category");
      return res.status(500).send("Error 500 /category");
    }
  }
}

export default new CategoryRouter();
