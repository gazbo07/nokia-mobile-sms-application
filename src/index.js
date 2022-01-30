import { StrictMode } from "react";
import ReactDOM from "react-dom";

import OldNokiaMobileSmsApp from "./OldNokiaMobileSmsApp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <OldNokiaMobileSmsApp />
  </StrictMode>,
  rootElement
);
