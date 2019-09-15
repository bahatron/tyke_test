import express from "express";
import asyncRoute from "./middleware/asyncRoute";
import $devices from "../domain/devices";

const ROUTER = express.Router();

ROUTER.post(
    "/devices",
    asyncRoute(async (req, res) => {
        return res.status(201).json(await $devices.create(req.body));
    })
);

ROUTER.get(
    "/devices",
    asyncRoute(async (req, res) => {
        return res.status(200).json(await $devices.find(req.query));
    })
);

ROUTER.get(
    "/devices/:deviceId",
    asyncRoute(async (req, res) => {
        return res.status(200).json(await $devices.fetch(req.params.deviceId));
    })
);

export default ROUTER;
