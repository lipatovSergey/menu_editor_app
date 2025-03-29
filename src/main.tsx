import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/normalize.css";
import "./styles/style.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
