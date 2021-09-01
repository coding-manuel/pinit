import React from "react";
import { ThemeProvider } from 'styled-components';
import Theme from "./theme";
import Topbar from "./components/Navbar/toptitle.topbar.jsx";
import Sidebar from "./components/Sidebar/sidebar.jsx";

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<Topbar />
			<Sidebar/>
		</ThemeProvider>
	);
}

export default App;
