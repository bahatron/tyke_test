import $db from "../../services/db";

const $uuid = require("uuid");

export const TABLE_NAME = "devices";

export interface Device {
    deviceId: string;
    name: string;
    firmwareVersion: string;
    firmwareRevision: string;
}

export function factory(data: any): Device {
    let { deviceId, name, firmwareVersion, firmwareRevision } = data;
    return {
        deviceId: deviceId || $uuid.v4(),
        name: name || "",
        firmwareVersion: firmwareVersion || "",
        firmwareRevision: firmwareRevision || "",
    };
}

const $device = {
    create: async (data: any): Promise<Device> => {
        let device = factory(data);

        await $db.insert(TABLE_NAME, device);

        return device;
    },

    fetch: async (deviceId: string): Promise<Device> => {
        let record = await $db.findBy(TABLE_NAME, { deviceId });

        let device = factory(record.shift());

        return device;
    },

    find: async (query: any): Promise<Device[]> => {
        let result = await $db.findBy(TABLE_NAME, query);

        return result.map(factory);
    },
};

export default $device;
