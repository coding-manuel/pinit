dev = process.env.NODE_ENV === "development";
BASE_URL = dev ? "http://localhost:3000" : "https://pinit-notes.herokuapp.com";

module.exports = BASE_URL;
