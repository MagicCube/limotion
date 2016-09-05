import events from "events";
import logger from "winston";

import SensorStorage from "../SensorStorage";

export default class MongoSensorStorage extends SensorStorage
{
    get collection()
    {
        return this._collection;
    }

    async bind(sensor)
    {
        this._sensor = sensor;
        this.sensor.on("updated", this._sensor_onUpdated.bind(this));
        let collectionName = null;
        try
        {
            collectionName = this.sensor.config.storage.collection.name;
        }
        catch (err)
        {
            throw new Error(`Can't get the collection name of sensor "${this.sensor.name}". Check your config in section "config.storage.collection.name".`);
        }

        try
        {
            const conn = this.connection.internalConnection;
            this._collection = await conn.createCollection(collectionName, {
                noPadding: true // NOTE see https://docs.mongodb.com/manual/core/mmapv1/#exact-fit-allocation
            });
        }
        catch (err)
        {
            logger.error(err);
            throw new Error(`Error ocurs when create collection for sensor "${this.sensor.name}".`);
        }

        try
        {
            await this.collection.ensureIndex({ timestamp: 1 }, { unique: true });
        }
        catch (err)
        {
            logger.error(err);
            throw new Error(`Error ocurs when create index for the collection of sensor "${this.sensor.name}".`);
        }
    }



    async _sensor_onUpdated(e)
    {
        try
        {
            //this.getDocumentOfTime(sensor.lastUpdatedTime);
        }
        catch(err)
        {
            logger.error(err);
        }
    }



    getDocumentOfTime(date)
    {

    }

    getLastUpdatedHours()
    {
        if (this.sensor.lastUpdatedTime)
        {
            const d = this.sensor.lastUpdatedTime;
            const fullYear = d.getFullYear();
            const months = d.getMonth();
            const date = d.getDate();
            const hours = d.getHours();
            return new Date(fullYear, months, date, hours);
        }
        else
        {
            return null;
        }
    }
}
