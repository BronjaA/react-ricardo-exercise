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
      <div className="heading-container">
        <div className="filter">
          <div className="header-shadow" />
          <div className="heading-wrapper">
            <h1>
              Securely buy & sell <br /> with over <br /> 3 Million users
            </h1>
            <SearchBar performSearch={performSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
