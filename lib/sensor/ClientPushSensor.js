import logger from "winston";

import Sensor from "./Sensor";

export default class ClientPushSensor extends Sensor
{
    constructor(config)
    {
        super(config);
    }
}
