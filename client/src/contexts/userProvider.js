import React, { useState, useEffect } from "react";
import axios from "../services/api";
const UserContext = React.createContext([{}, () => {}]);

const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	// useEffect(() => {
	// 	axios()
	// 		.get("/auth/user")
	// 		.then((res) => {
	// 			setUser(res);
	// 			cookies.set("loggedin", "true", {
	// 				path: "/",
	// 				maxAge: 1000 * 60 * 60 * 24,
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
