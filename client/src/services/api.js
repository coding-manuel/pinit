import axios from "axios";

export default () => {
	return axios.create({
		baseURL: "https://pinit-notes.herokuapp.com/api",
		withCredentials: true,
		headers: {
			Accept: "application/json",
			"content-Type": "application/json",
		},
	});
};
