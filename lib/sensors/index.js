import logger from "winston";

import HttpClientPushSensor from "./http/HttpClientPushSensor";
import HttpServerPullSensor from "./http/HttpServerPullSensor";

import storage from "../storage";

const sensors = require("../../sensors");

async function loadSensors()
{
    logger.info("Loading sensors...");
    let s = null;
    for (let i = 0; i < sensors.length; i++)
    {
        s = sensors[i];
        logger.info(`- [${s.name}]`);
        let sensor = null;
        try
        {
            if (s.monitor.mode === "http-server-pull")
            {
                sensor = new HttpServerPullSensor(s);
            }
            else if (s.monitor.mode === "http-client-push")
            {
                sensor = new HttpClientPushSensor(s);
            }
            else
            {
                throw new Error(`"${s.monitor.mode}" is not a supported sensor monitor mode. Try "http-server-pull" or "http-client-push".`);
            }
            // Re-map indices for sensor.
            sensors[i] = sensor;
            if (s.id)
            {
                sensors[s.id] = sensor;
            }
        }
        catch (err)
        {
            logger.error(err);
            throw new Error(`Error ocurs when create sensor "${s.name}".`);
        }

        const sensorStorage = new storage.SensorStorage(storage.connection);
        try
        {
            await sensorStorage.bind(sensor);
        }
        catch (err)
        {
            logger.error(err);
            throw new Error(`Error ocurs when binding SensorStorage to sensor "${s.name}".`);
        }

        if (sensor.startMonitor)
        {
            sensor.startMonitor();
        }
    }
}


sensors.load = loadSensors;
export default sensors;
