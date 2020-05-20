//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";

//> Routes
import Routes from "./Routes";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="flyout">
          <main>
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
