import axios from "axios";

const BASE_URI =
	process.env.NODE_ENV === "development"
		? "http://localhost:8080"
		: "https://pinit-notes.herokuapp.com";

export default () => {
	return axios.create({
		baseURL: `${BASE_URI}/api`,
		withCredentials: true,
		headers: {
			Accept: "application/json",
			"content-Type": "application/json",
		},
	});
};
