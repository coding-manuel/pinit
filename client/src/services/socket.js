import socket from "socket.io-client";
import { SOCKET_URL } from "./config";

const io = socket(SOCKET_URL, {
	withCredentials: true,
	reconnectionDelay: 5000,
});

export { io };
