import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
//import App_back from "./App_back";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
