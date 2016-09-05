import settings from "./settings";

settings.get = (function(key, defaultValue = undefined) {
    const parts = key.split(".");
    let context = this;
    for (let i = 0; i < parts.length; i++)
    {
        context = context[parts[i]];
        if (!context)
        {
            return defaultValue;
        }
    }
    return context !== undefined ? context : defaultValue;
}).bind(settings);

export default settings;
