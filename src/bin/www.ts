import expressServer from "../server";
import http from "http";

const PORT = 3000;

const httpServer = new http.Server(expressServer);

httpServer.on("listening", () => {
    console.log(`HTTP Server - listening in port ${PORT}`);
});

httpServer.on("error", err => {
    console.log(`HTTP Server - ERROR:`, err.message);
});

httpServer.listen(PORT);
