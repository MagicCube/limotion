import events from "events";

export default class Sensor extends events.EventEmitter
{
    constructor(config)
    {
        super();
        this._config = config;
        this._name = config.name;
        this._meta = config.meta;

        this._value = {};
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
    }
}
