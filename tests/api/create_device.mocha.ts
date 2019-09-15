import { expect } from "chai";
import $axios from "../../src/adapters/axios";
import $env from "@bahatron/env";
import { AxiosResponse } from "axios";
import $db from "../../src/services/db";
import { TABLE_NAME } from "../../src/domain/devices";

const $uuid = require("uuid");

const BASE_URL = $env.get("TEST_API_URL", "http://localhost:3000");

export async function createDeviceEndpoint(data: any) {
    return $axios.post(`${BASE_URL}/devices`, data);
}

describe("CREATE DEVICE", () => {
    let FIXTURE = {
        deviceId: $uuid.v4(),
        name: "deviceName",
        firmwareVersion: "1.3.4",
        firmwareRevision: "RC15",
    };

    let RESPONSE: AxiosResponse;
    before(async () => {
        RESPONSE = await createDeviceEndpoint(FIXTURE);
    });

    it("returns the created device", async () => {
        expect(RESPONSE.data).to.deep.eq(FIXTURE);
    });

    it("creates a device", async () => {
        let result = await $db.findBy(TABLE_NAME, {
            deviceId: FIXTURE.deviceId,
        });

        let device = result.shift();

        expect(Boolean(device)).to.be.true;

        Object.entries(FIXTURE).forEach(([key, value]: any) => {
            expect(device[key]).to.eq(value);
        });
    });
});
