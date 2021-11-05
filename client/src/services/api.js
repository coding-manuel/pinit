import axios from "axios";

export default () => {
	return axios.create({
		withCredentials: true,
		headers: {
			Accept: "application/json",
			"content-Type": "application/json",
		},
	});
};
