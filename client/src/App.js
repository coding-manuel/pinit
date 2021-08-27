import React from "react";
import { ThemeProvider } from 'styled-components';
import Theme from "./theme";
import Topbar from "./components/Navbar/toptitle.topbar.jsx";

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<Topbar />
		</ThemeProvider>
	);
}

export default App;
