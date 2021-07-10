import { useHistory } from "react-router-dom";
import "./home-page.scss";
import SearchBar from "../../components/search-bar/SearchBar";

const HomePage = () => {
  const history = useHistory();

  const performSearch = (searchText: string) => {
    history.push(`/search/${searchText}`);
  };

  return (
    <div id="home-page-container">
      <SearchBar performSearch={performSearch} />
    </div>
  );
};

export default HomePage;
