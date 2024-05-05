import React from "react";
import BotsPage from "./containers/BotsPage"; // Correct import path
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BotsPage />
      </div>
    );
  }
}

export default App;
