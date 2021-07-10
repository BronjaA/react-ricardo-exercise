import axios from "axios";

const baseUrl = "https://www.ricardo.ch/api/frontend/recruitment";
const apiToken = "db8b418fc520fe2b8b908d7948cfd4c7c002f42b";

const listArticlesBySearchText = (
  searchText: string,
  onSuccessCallback: any,
  onErrorCallback: any
) => {
  axios
    .get(`${baseUrl}/search`, {
      params: { searchText, apiToken },
    })
    .then((response) => onSuccessCallback(response.data))
    .catch((error) => onErrorCallback(error));
};

const showArticleById = (
  articleId: string,
  articleCallback: any,
  userCallback: any,
  onErrorCallback: any
) => {
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
