import { MongoClient, Db, MongoClientOptions } from "mongodb";
import $env from "@bahatron/env";

const _url = $env.get("MONGO_URL", "mongodb://mongo:27017");
const _dbName = $env.get("MONGO_DB", "test");

let options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const _client: Promise<MongoClient> = new Promise((resolve, reject) => {
    MongoClient.connect(_url, options)
        .then(client => {
            resolve(client);
        })
        .catch(err => {
            reject(err);
        });
});

const $mongo = {
    db: async (db: string = _dbName): Promise<Db> => {
        return (await _client).db(db);
    },
};

export { MongoClient };
export default $mongo;
