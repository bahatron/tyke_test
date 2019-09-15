import { expect } from "chai";
import $axios from "../../src/adapters/axios";
import $env from "@bahatron/env";
import $db from "../../src/services/db";
import { TABLE_NAME } from "../../src/domain/devices";

const $uuid = require("uuid");

const BASE_URL = $env.get("TEST_API_URL", "http://localhost:3000");

export async function executeFindDevices(query: Record<string, string> = {}) {
    return $axios.get(`${BASE_URL}/devices`, {
        params: query,
    });
}

const FIXTURES = [
    {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC20",
    },
    {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC20",
    },
    {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC20",
    },
    {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC15",
    },
    {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC15",
    },
];

describe("FIND DEVICES", () => {
    before(async () => {
        await $db.truncate(TABLE_NAME);

        await $db.insertMany(TABLE_NAME, FIXTURES);
    });

    it("returns a list of devices", async () => {
        let result = await executeFindDevices();

        expect(Array.isArray(result.data)).to.be.true;
    });

    it("returns all devices with if no query is passed", async () => {
        let result = await executeFindDevices();

        expect(result.data.length).to.eq(FIXTURES.length);
    });

    it("filter the collection by the query that is sent", async () => {
        let result = await executeFindDevices({ firmwareRevision: "RC20" });

        expect(result.data).to.be.deep.eq(
            FIXTURES.filter(fixture => fixture.firmwareRevision === "RC20")
        );
    });
});
