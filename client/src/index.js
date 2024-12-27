import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from 'react-dom/client'
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store";

// Find the root element in your HTML
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React application
root.render(
  <Provider store={store}>
  <App />
</Provider>
);
