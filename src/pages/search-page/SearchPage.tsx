import "./search-page.scss";
import React, { useState } from "react";
import { SearchPageProps } from "../../common/types";

const SearchPage: React.FC<SearchPageProps> = ({ match }) => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div id="search-page-container">
      <p>Total count: {totalCount}</p>
      <div id="articles-grid">
        <p>{match.params.searchText}</p>
      </div>
    </div>
  );
};

export default SearchPage;
