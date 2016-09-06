import express from "express";
import logger from "winston";

import app from "../../server/app";
import Sensor from "../Sensor";

export default class HttpClientPushSensor extends Sensor
{
    constructor(config)
    {
        super(config);
        this._initRouter();
    }

    _initRouter()
    {
        this._router = express.Router();
        const path = `/api/sensor/${this.id}/data`;
        this._router.post(path, (req, res) => {
            const value = req.body;
            this.setValue(value);
            res.end("OK");
        });
        app.use(this._router);
    }


    get router()
    {
        return this._router;
    }
}
