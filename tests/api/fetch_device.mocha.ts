import { expect } from "chai";
import $axios from "../../src/adapters/axios";
import $env from "@bahatron/env";
import $db from "../../src/services/db";
import { TABLE_NAME } from "../../src/domain/devices";

const $uuid = require("uuid");

const BASE_URL = $env.get("TEST_API_URL", "http://localhost:3000");

export async function fetchDeviceEndpoint(id: string) {
    return $axios.get(`${BASE_URL}/devices/${id}`);
}

describe("FETCH DEVICE", () => {
    let FIXTURE = {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC15",
    };

    before(async () => {
        await $db.truncate(TABLE_NAME);

        await $db.insert(TABLE_NAME, FIXTURE);
    });

    it("returns a device", async () => {
        let result = await fetchDeviceEndpoint(FIXTURE.deviceId);

        expect(result.data).to.deep.eq(FIXTURE);
    });
});
