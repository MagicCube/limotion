import mongodb from "mongodb";
import logger from "winston";

import DbConnection from "../DbConnection";

export default class MongoDbConnection extends DbConnection
{
    async connect()
    {
        this._internalConnection = await mongodb.MongoClient.connect(this.config.url);
    }
}
