import $mongo from "../adapters/mongo";
import { cloneDeep } from "lodash";

const $db = {
    async insert(table: string, data: any): Promise<void> {
        let client = await $mongo.db();

        // the mongo client will alter the original object, so we need to send a copy instead
        await client.collection(table).insertOne(cloneDeep(data));
    },

    async insertMany(table: string, records: any[]): Promise<void> {
        let client = await $mongo.db();
        
        await client.collection(table).insertMany(cloneDeep(records));
    },

    async findBy(table: string, query: any): Promise<any[]> {
        let result = await (await $mongo.db()).collection(table).find(query);

        return result.toArray();
    },

    async truncate(table: string): Promise<void> {
        let client = await $mongo.db();

        await client.collection(table).drop();
    },
};

export default $db;
