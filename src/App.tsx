import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import SearchPage from "./pages/search-page/SearchPage";
import ProductDetailsPage from "./pages/product-details-page/ProductDetailsPage";

function App() {
  // Search page filter states
  const [buyNowFilter, setBuyNowFilter] = useState(false);
  const [auctionFilter, setAuctionFilter] = useState(false);
  const [savedMinPrice, setSavedMinPrice] = useState(0);
  const [savedMaxPrice, setSavedMaxPrice] = useState(0);

  // Toggles the buy now filter
  const toggleBuyNowFilter = () => {
    setBuyNowFilter(!buyNowFilter);
  };
  // Toggles the auction filter
  const toggleAuctionFilter = () => {
    setAuctionFilter(!auctionFilter);
  };
  // Resets all filters
  const resetTypeFilters = () => {
    setBuyNowFilter(false);
    setAuctionFilter(false);
  };
  // Reset the price range
  const resetPriceRange = () => {
    setSavedMinPrice(0);
    setSavedMaxPrice(0);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePage resetPriceRange={resetPriceRange} resetTypeFilters={resetTypeFilters} />
            )}
          />
          <Route
            path="/search/:searchText"
            render={(props) => (
              <SearchPage
                {...props}
                buyNowFilter={buyNowFilter}
                toggleBuyNowFilter={toggleBuyNowFilter}
                auctionFilter={auctionFilter}
                toggleAuctionFilter={toggleAuctionFilter}
                savedMinPrice={savedMinPrice}
                setSavedMinPrice={setSavedMinPrice}
                savedMaxPrice={savedMaxPrice}
                setSavedMaxPrice={setSavedMaxPrice}
                resetTypeFilters={resetTypeFilters}
              />
            )}
          />
          <Route path="/article/:articleId" component={ProductDetailsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
