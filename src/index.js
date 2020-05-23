import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
