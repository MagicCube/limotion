import logger from "winston";

import config from "../../config";

let _storage = {};

function setup()
{
    const defaultConnectionName = config.get("storage.default");
    if (defaultConnectionName)
    {
        if (config.get(`storage.connections.${defaultConnectionName}`))
        {
            const configSection = config.get(`storage.connections.${defaultConnectionName}`);
            let provider = null;
            switch (configSection.provider)
            {
                case "mongo":
                    provider = require("./mongo");
                    if (provider.default)
                    {
                        // In ES6, use provider.default
                        provider = provider.default;
                    }
                    break;
                default:
                    throw new Error(`The provider of connection "${defaultConnectionName}" is "${configSection.provider}" which is not supported.`);
            }
            _storage.name = defaultConnectionName;
            _storage.provider = provider;
            _storage.SensorStorage = provider.SensorStorage;
            configSection.name = defaultConnectionName;
            _storage.connection = new provider.DbConnection(configSection);
        }
        else
        {
            throw new Error(`Default connection "${defaultConnectionName}" not found.`);
        }
    }
    else
    {
        throw new Error(`Default connection must be specified in "storage.default".`);
    }
}

setup();
export default _storage;
