import logger from "winston";

import app from "../../server/app";
import Sensor from "../Sensor";

export default class HttpClientPushSensor extends Sensor
{
    initRouter()
    {
        super.initRouter();
        this.router.post("/value", this._value_post_handler.bind(this));
    }

    _value_post_handler(req, res)
    {
        const value = req.body;
        this.setValue(value);
        res.end("OK");
    }
}
