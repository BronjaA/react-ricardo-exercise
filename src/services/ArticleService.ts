import axios from "axios";
import { listMethod, showMethod } from "../common/types";

const baseUrl = "https://www.ricardo.ch/api/frontend/recruitment";
const apiToken = "db8b418fc520fe2b8b908d7948cfd4c7c002f42b";

const listArticlesBySearchText: listMethod = (searchText, onSuccessCallback, onErrorCallback) => {
  axios
    .get(`${baseUrl}/search`, {
      params: { searchText, apiToken },
    })
    .then((response) => onSuccessCallback(response.data))
    .catch((error) => onErrorCallback(error));
};

const showArticleById: showMethod = (articleId, articleCallback, userCallback, onErrorCallback) => {
  axios
    .get(`${baseUrl}/article-details`, { params: { articleId, apiToken } })
    .then((response) => {
      articleCallback(response.data);
      return axios.get(`${baseUrl}/user`, {
        params: { userId: response.data.sellerId, apiToken },
      });
    })
    .then((response) => userCallback(response.data))
    .catch((error) => onErrorCallback(error));
};

export { listArticlesBySearchText, showArticleById };
