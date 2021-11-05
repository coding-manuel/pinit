import axios from "axios";

export default () => {
	return axios.create({
		baseURL: "https://pinit-notetaker.herokuapp.com/api",
		withCredentials: true,
		headers: {
			Accept: "application/json",
			"content-Type": "application/json",
		},
	});
};
