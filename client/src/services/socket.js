import socket from "socket.io-client";
import { SOCKET_URL } from "./config";

const io = socket(SOCKET_URL);

export { io };
