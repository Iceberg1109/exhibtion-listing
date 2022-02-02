import axios from "axios";
import { EXHIBITION_PER_PAGE } from "../config/config";
import { ExhibitionInterface } from "../types/exhibition";

export interface ExhibitionsResult {
  data: ExhibitionInterface[];
  hasMore: boolean;
}

export const getExhibtionsByOffset = async (
  offset: number
): Promise<ExhibitionsResult> => {
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

export const getExhibitionDetail = async (
  id: string
): Promise<ExhibitionInterface> => {
  return axios
    .get(`https://api.artic.edu/api/v1/exhibitions/${id}`)
    .then((response) => {
      if (response.data.data) {
        return response.data.data;
      }
      return {};
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
