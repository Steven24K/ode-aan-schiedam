import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styling.css";

const container = document.getElementById("app");
if (container != null) {
    const root = createRoot(container)
    root.render(<React.StrictMode>
        <App />
    </React.StrictMode>);
}