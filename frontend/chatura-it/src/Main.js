import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout"; // Import the Layout component
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Home from "./components/Home";
import Batches from "./components/Batches";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import Contests from "./components/Contests";

const Main = () => {
  return (
    <Router>
      <Switch>
        {/* Landing page */}
        <Route exact path="/" component={LandingPage} />

        {/* Login page */}
        <Route exact path="/login" component={Login} />

        {/* Home Page with Layout */}
        <Route path="">
          <Layout>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/batches" component={Batches} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/contests" component={Contests} />
              {/* Add a default route for unknown routes within /home */}
              <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
          </Layout>
        </Route>

        {/* Add a default route for unknown routes */}
        <Route render={() => <h1>404 Not Found</h1>} />
      </Switch>
    </Router>
  );
};

export default Main;
