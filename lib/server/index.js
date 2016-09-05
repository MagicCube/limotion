import http from "http";
import app from "./app";

let server = null;

function setup()
{
    const port = normalizePort(process.env.PORT || '3000')
    app.set("port", port);

    server = http.createServer(app);
    server.listen(port);
}

function normalizePort(val)
{
    let port = parseInt(val, 10);
    if (isNaN(port))
    {
        return val;
    }
    if (port >= 0)
    {
        return port;
    }
    return false;
}

export default {
    app,
    server,
    setup
};
