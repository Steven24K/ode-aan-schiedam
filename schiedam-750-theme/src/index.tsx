import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/styling.scss";

const container = document.getElementById("app");
if (container != null) {
    const root = createRoot(container)
    root.render(<App />);
}