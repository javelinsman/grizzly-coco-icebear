import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:patientId">
          <MainContainer />
        </Route>
        <Route path="/">
          <MainContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
