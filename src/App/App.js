import React from "react";
import Header from "../Header";
import AppRouter from "./AppRouter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="item-a">
          <Header />
        </div>
        <div className="item-b">
          <AppRouter />
        </div>
        {/* <div className="item-c"></div> */}
      </div>
    </div>
  );
}

export default App;
