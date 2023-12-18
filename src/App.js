import React from "react";
import Board from "./Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Lights Out</h1>
      <Board nrows={3} ncols={3} chanceLightStartsOn={0.25} />
    </div>
  );
}

export default App;