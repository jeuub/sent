import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import "./index.css";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<div>Landing page</div>} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  /* eslint-disable */
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
