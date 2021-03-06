import React, {useEffect} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import Favorites from "pages/Favorites/Favorites";
import Text from "./components/Text";
import MapPage from "pages/MapPage/MapPage";

const AppRouter = () => {
  useEffect(() => {
    if(!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    if(!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  }, []);
  

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/map" component={MapPage} />
          <Route path="/" render={() => <div style={{marginTop: "100px"}}><Text size="28px">404 Not Found</Text></div>}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
