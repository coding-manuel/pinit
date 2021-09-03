import React from "react";
import { ThemeProvider } from 'styled-components';
import Theme from "./theme";
import Topbar from "./components/Navbar/toptitle.topbar.jsx";
import Sidebar from "./components/Sidebar/sidebar.jsx";
import Canvas from "./components/Canvas/Canvas.jsx"

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<Topbar />
			<Canvas />
			<Sidebar/>
		</ThemeProvider>
	);
}

export default App;
