import axios from "axios";

export default () => {
	return axios.create({
		baseURL: "http://localhost:8080/api",
		withCredentials: true,
		headers: {
			Accept: "application/json",
			"content-Type": "application/json",
		},
	});
};
