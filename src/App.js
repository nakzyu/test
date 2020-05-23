import React from "react";
import Banner from "./component/banner";
import ItemList from "./component/itemList";
import "./App.css";

function App() {
  return (
    <div className="App">
      FRESHCODE
      <Banner />
      프레쉬코드 샐러드
      <ItemList />
    </div>
  );
}

export default App;
