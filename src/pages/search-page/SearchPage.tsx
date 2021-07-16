import "./search-page.scss";
import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { SearchPageProps, SearchArticle, SearchResponse } from "../../common/types";
import { listArticlesBySearchText } from "../../services/ArticleService";
import ArticleCard from "../../components/article-card/ArticleCard";
import PriceInput from "../../components/price-input/PriceInput";

const SearchPage: React.FC<SearchPageProps> = ({
  match,
  buyNowFilter,
  auctionFilter,
  toggleBuyNowFilter,
  toggleAuctionFilter,
  savedMinPrice,
  setSavedMinPrice,
  savedMaxPrice,
  setSavedMaxPrice,
  resetTypeFilters,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [minAllowedPrice, setMinAllowedPrice] = useState(0);
  const [maxAllowedPrice, setMaxAllowedPrice] = useState(0);
  const [fetchedSearchArticles, setFetchedSearchArticles] = useState<SearchArticle[]>();
  const [filteredSearchArticles, setFilteredSearchArticles] = useState<SearchArticle[]>();
  const [numberOfBuyNowArticles, setNumberOfBuyNowArticles] = useState(0);

  // Fetch Search Response
  useEffect(() => {
    const onSuccessCallback = (data: SearchResponse) => {
      setTotalCount(data.totalCount);

      // Sorts the fetched SearchArticle array by date ascending
      const sortedArray = data.articles;
      sortedArray.sort((a, b) => Date.parse(a.endDate) - Date.parse(b.endDate));

      setFetchedSearchArticles(sortedArray);
      setFilteredSearchArticles(returnFilteredArticles(sortedArray));

      const minPrice = data.articles.reduce((prev, curr) => {
        if (!prev.buyNowPrice) return curr;
        if (!curr.buyNowPrice) return prev;
        return prev.buyNowPrice < curr.buyNowPrice ? prev : curr;
      }).buyNowPrice;

      const maxPrice = data.articles.reduce((prev, curr) => {
        if (!prev.buyNowPrice) return curr;
        if (!curr.buyNowPrice) return prev;
        return prev.buyNowPrice > curr.buyNowPrice ? prev : curr;
      }).buyNowPrice;

      setMinAllowedPrice(minPrice);
      if (!savedMinPrice) {
        setSavedMinPrice(minPrice);
      }

      setMaxAllowedPrice(maxPrice);
      if (!savedMaxPrice) {
        setSavedMaxPrice(maxPrice);
      }

      setIsLoading(false);
    };
    const onErrorCallback = (error: Error | AxiosError) => {
      alert(error);
    };

    listArticlesBySearchText(match!.params.searchText, onSuccessCallback, onErrorCallback);
  }, []);

  // Set the filteredSearchArticles every time the filters change
  useEffect(() => {
    if (!isLoading) {
      // Resets the price range everytime someone sets the minprice higher than the maxprice
      if (savedMinPrice > savedMaxPrice) {
        setSavedMinPrice(minAllowedPrice);
        setSavedMaxPrice(maxAllowedPrice);
      }
      setFilteredSearchArticles(returnFilteredArticles(fetchedSearchArticles!));
    }
  }, [isLoading, buyNowFilter, auctionFilter, savedMinPrice, savedMaxPrice]);

  // Returns the filtered array of Articles based on the active search filters
  const returnFilteredArticles = (fetchedArticles: SearchArticle[]) => {
    const filteredArticlesByPrice = fetchedArticles.filter((searchArticle) => {
      return (
        !searchArticle.buyNowPrice ||
        (searchArticle.buyNowPrice >= savedMinPrice && searchArticle.buyNowPrice <= savedMaxPrice)
      );
    });

    // Calculates the number of articles with an buyNowPrice for the filtered price range
    setNumberOfBuyNowArticles(
      filteredArticlesByPrice.filter((article) => {
        return article.buyNowPrice !== null;
      }).length
    );

    const filteredArticlesByOfferType = filteredArticlesByPrice.filter((searchArticle) => {
      return (
        buyNowFilter === auctionFilter ||
        (!searchArticle.buyNowPrice === !buyNowFilter &&
          !searchArticle.buyNowPrice === auctionFilter)
      );
    });

    return filteredArticlesByOfferType;
  };

  const resetFilterForm = () => {
    setSavedMinPrice(minAllowedPrice);
    setSavedMaxPrice(maxAllowedPrice);

    resetTypeFilters();
  };

  return (
    <div id="search-page-container">
      {!isLoading && (
        <div className="content-wrapper">
          {/* Filters */}
          <div id="filters-wrapper">
            <div className="filters-heading">
              <p>FILTERS</p>
              <button type="button" onClick={resetFilterForm}>
                Reset
              </button>
            </div>

            {/* Offer type filters */}
            <div className="filter-card">
              <p>Type of offer</p>
              <label htmlFor="buy-now">
                <div>
                  <input
                    type="checkbox"
                    id="buy-now"
                    checked={buyNowFilter}
                    onChange={toggleBuyNowFilter}
                  />
                  Buy now
                </div>
                <p>{numberOfBuyNowArticles}</p>
              </label>
              <label htmlFor="auction">
                <div>
                  <input
                    type="checkbox"
                    id="auction"
                    checked={auctionFilter}
                    onChange={toggleAuctionFilter}
                  />
                  Auction
                </div>
                <p>
                  {
                    fetchedSearchArticles?.filter((article) => {
                      return !article.buyNowPrice;
                    }).length
                  }
                </p>
              </label>
            </div>

            {/* Price range filter */}
            <div className="filter-card">
              <p>Price range</p>
              <div className="range-wrapper">
                <PriceInput
                  value={savedMinPrice}
                  placeholder="from"
                  minAllowedPrice={minAllowedPrice}
                  maxAllowedPrice={maxAllowedPrice}
                  onChange={setSavedMinPrice}
                />

                <PriceInput
                  value={savedMaxPrice}
                  placeholder="to"
                  minAllowedPrice={minAllowedPrice}
                  maxAllowedPrice={maxAllowedPrice}
                  onChange={setSavedMaxPrice}
                />
              </div>
            </div>
          </div>

          {/* Search results */}
          <div id="search-results-wrapper">
            <p className="total-count">Total count: {totalCount.toLocaleString("de-DE")}</p>
            <div className="articles-grid">
              {filteredSearchArticles!.map((searchArticle) => {
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
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
