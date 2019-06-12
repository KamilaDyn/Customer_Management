import React from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Main from "./components/Main";

const App = () => (
  <div>
    <Header />
    <div className="container">
      <Main />
    </div>
  </div>
);

export default App;
