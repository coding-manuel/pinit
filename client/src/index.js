import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

WebFont.load({
	google: {
		families: ["Open Sans:300,400,600,700", "Bitter:600", "sans-serif"],
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
