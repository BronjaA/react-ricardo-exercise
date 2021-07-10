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

const showArticleById = () => {};

export { listArticlesBySearchText, showArticleById };
