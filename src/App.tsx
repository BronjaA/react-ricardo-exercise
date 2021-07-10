import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import SearchPage from "./pages/search-page/SearchPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/search/:searchText" component={SearchPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
