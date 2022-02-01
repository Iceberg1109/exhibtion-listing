import axios from "axios";
import { EXHIBITION_PER_PAGE } from "../config/config";

const getExhibtionsByOffset = async (offset: number) => {
  return axios
    .get("https://api.artic.edu/api/v1/exhibitions", {
      params: {
        page: offset / EXHIBITION_PER_PAGE + 1,
        limit: EXHIBITION_PER_PAGE,
      },
    })
    .then((response) => {
      if (response.data.data) {
        return {
          data: response.data.data,
          hasMore:
            response.data.pagination.current_page <
            response.data.pagination.total_pages,
        };
      }
      return {
        data: [],
        hasMore: false,
      };
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export { getExhibtionsByOffset };
