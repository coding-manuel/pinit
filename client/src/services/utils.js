import axios from "./api";

export function getUser() {
	axios()
		.get("/auth/user", {
			headers: {
				Authorization: "Bearer " + localStorage.getItem("user"),
			},
		})
		.then(
			(res) => {
				return res.data;
			},
			(err) => {
				return err;
			}
		);
}
