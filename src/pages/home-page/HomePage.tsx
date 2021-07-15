import "./home-page.scss";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/search-bar/SearchBar";
import { HomePageProps } from "../../common/types";

const HomePage: React.FC<HomePageProps> = ({ resetPriceRange, resetTypeFilters }) => {
  useEffect(() => {
    resetPriceRange();
    resetTypeFilters();
  }, []);

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
