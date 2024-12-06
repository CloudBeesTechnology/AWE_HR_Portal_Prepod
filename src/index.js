import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports.js";
// console.log(awsExports);

Amplify.configure(awsExports);

if (!window.console) {
  window.console = {
    log: function () {},
    warn: function () {},
    error: function () {},
    time: function () {},
    timeEnd: function () {}
  };
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
