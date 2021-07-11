import "./search-bar.scss";
import React, { useState } from "react";
import { SearchBarProps } from "../../common/types";

const SearchBar: React.FC<SearchBarProps> = ({ performSearch }) => {
  const [searchText, setSearchText] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    performSearch(searchText);
  };

  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search Ricardo"
      />
      <input type="submit" value="Search" disabled={!searchText} />
    </form>
  );
};

export default SearchBar;
