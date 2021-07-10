import "./search-page.scss";
import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { SearchPageProps, SearchArticle, SearchResponse } from "../../common/types";
import { listArticlesBySearchText } from "../../services/ArticleService";
import ArticleCard from "../../components/article-card/ArticleCard";

const SearchPage: React.FC<SearchPageProps> = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchArticles, setSearchArticles] = useState<SearchArticle[]>();

  useEffect(() => {
    const onSuccessCallback = (data: SearchResponse) => {
      setTotalCount(data.totalCount);
      setSearchArticles(data.articles);
      setIsLoading(false);
    };
    const onErrorCallback = (error: Error | AxiosError) => {
      alert(error);
    };

    listArticlesBySearchText(match.params.searchText, onSuccessCallback, onErrorCallback);
  }, []);

  return (
    <div id="search-page-container">
      {!isLoading && (
        <>
          <p>Total count: {totalCount}</p>
          <div id="articles-grid">
            {searchArticles!.map((searchArticle) => {
              const { id, title, endDate, imageUrl, buyNowPrice } = searchArticle;
              return (
                <ArticleCard
                  key={id}
                  id={id}
                  title={title}
                  endDate={endDate}
                  imageUrl={imageUrl}
                  buyNowPrice={buyNowPrice}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
