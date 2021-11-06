export const SOCKET_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:8080"
		: "https://pinit-notes.herokuapp.com";
