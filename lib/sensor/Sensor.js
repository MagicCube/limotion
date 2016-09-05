import events from "events";
import logger from "winston";
import request from "request-promise";

export default class Sensor extends events.EventEmitter
{
    constructor(config)
    {
        super();
        this._config = config;
        this._name = config.name;
        this._meta = config.meta;

        this._value = {};
        this._monitoring = false;
        this._lastUpdatedTime = null;
    }


    get name()
    {
        return this._name;
    }

    get config()
    {
        return this._config;
    }

    get meta()
    {
        return this._meta;
    }


    get value()
    {
        return this._value;
    }
    _setValue(value)
    {
        if (JSON.stringify(value) !== JSON.stringify(this._value))
        {
            this._value = value;
            this.emit("valueChanged");
        }
    }

    get monitoring()
    {
        return this._monitoring;
    }

    get lastUpdatedTime()
    {
        return this._lastUpdatedTime;
    }




    startMonitor()
    {
        this._monitoring = true;
        this.updateValue();
        this.updateValuePoll();
    }

    stopMonitor()
    {
        this._monitoring = false;
    }



    async updateValue()
    {
        let value = null;
        try
        {
            value = await request(this.config.monitor.url, { json: true });
        }
        catch (err)
        {
            logger.error(`- [${this.name}] Fail to update from sensor.`);
            throw err;
        }
        this._setValue(value);
        this._lastUpdatedTime = new Date();
        logger.info(`- [${this.name}] ${JSON.stringify(this.value)}`);
        this.emit("updated");
    }

    updateValuePoll()
    {
        if (this.monitoring)
        {
            setTimeout(async () => {
                if (this.monitoring)
                {
                    try
                    {
                        await this.updateValue();
                    }
                    catch (e)
                    {
                        logger.error(e);
                    }
                    finally
                    {
                        if (this.monitoring)
                        {
                            this.updateValuePoll();
                        }
                    }
                }
            }, this.config.monitor.interval);
        }
    }
}
