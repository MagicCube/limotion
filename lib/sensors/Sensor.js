import events from "events";
import logger from "winston";

export default class Sensor extends events.EventEmitter
{
    constructor(config)
    {
        super();
        this._config = config;
        this._id = config.id;
        this._name = config.name;
        this._meta = config.meta;
        this._storage = null;

        this._value = {};
        this._lastUpdatedTime = null;
    }


    get id()
    {
        return this._id;
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

    get storage()
    {
        return this._storage;
    }

    get lastUpdatedTime()
    {
        return this._lastUpdatedTime;
    }


    get value()
    {
        return this._value;
    }
    setValue(value)
    {
        this._lastUpdatedTime = new Date();
        if (JSON.stringify(value) !== JSON.stringify(this._value))
        {
            this._value = value;
            this.emit("valueChanged");
        }
        this.emit("updated");
        logger.info(`- [${this.name}] ${JSON.stringify(this.value)}`);
    }
}
