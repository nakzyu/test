import React from "react";
import Banner from "./component/banner";
import ItemList from "./component/itemList";
import Calendar from "./component/calendar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Banner />
      <ItemList />
      <Calendar />
    </div>
  );
}

export default App;
