import express from "express";
import logger from "winston";

import app from "../../server/app";
import Sensor from "../Sensor";

export default class HttpClientPushSensor extends Sensor
{
    constructor(config)
    {
        super(config);
        this._initUpdateRouter();
    }

    _initUpdateRouter()
    {
        this._updateRouter = express.Router();
        const path = `/api/sensor/${this.id}/data`;
        this._updateRouter.post(path, (req, res) => {
            const value = req.body;
            this.setValue(value);
            res.end("OK");
        });
        app.use(this._updateRouter);
    }


    get updateRouter()
    {
        return this._updateRouter;
    }
}
