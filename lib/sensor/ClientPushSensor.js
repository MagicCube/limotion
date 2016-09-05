import express from "express";
import logger from "winston";

import Sensor from "./Sensor";

export default class ClientPushSensor extends Sensor
{
    constructor(config)
    {
        super(config);

        this._initRouter();
    }

    _initRouter()
    {
        this._router = express.Router();
        const path = "/dht11";
        this._router.get(path, (req, res) => {
            const value = {};
            for (let key in this.meta.values)
            {
                const v = parseDouble(req.param(key));
                value[key] = v;
            }
            this.setValue(value);
            res.end();
        });
    }


    get router()
    {
        return this._router;
    }
}
