import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import Landing from "./components/Landing/Landing";
import NotFound from "./components/NotFound/NotFound";
import "./index.css";

// Init VK  Mini App
bridge.send("VKWebAppInit");
// .then(data => {
//   console.log(data);
// }).catch(err => console.log(err));

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/app" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  /* eslint-disable */
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
