import express, { Response, Request, NextFunction } from "express";
import ROUTER from "./routes";

const SERVER = express();

SERVER.use(express.json());

SERVER.get("/ping", (req, res) => {
    res.json("pong");
});

SERVER.use(ROUTER);

/** @description http error handler */
SERVER.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`Request error: ${err.message}`);
    console.log(err);
    res.status(err.httpCode || 500).json(
        err.httpCode ? err.message : "Internal Error"
    );
});

export default SERVER;
