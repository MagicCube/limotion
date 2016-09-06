import logger from "winston";

import server from "./lib/server";
import sensors from "./lib/sensors";

const config = require("./config");

async function startup()
{
    printStarLine();
    console.log("* Hello from Limotion *");
    printStarLine();
    console.log("Limotion server is now starting...");

    await prepare();

    printStarLine();
    logger.info("Congratulations! Limotion server is now running.");
}

async function prepare()
{
    await setup();
    await loadSensors();
}

async function setup()
{
    setupLogger();
    setupServer();
    await setupStorage();
}

function setupLogger()
{
    logger.remove(logger.transports.Console);
    logger.add(logger.transports.Console, {
        timestamp: () => new Date().toString().substr(0, 24),
        colorize: true
    });
}

function setupServer()
{
    server.setup();
}

async function setupStorage()
{
    let storage = null;
    try
    {
        storage = require("./lib/storage");
        if (storage.default)
        {
            // In ES6, use storage.default
            storage = storage.default;
        }
        logger.info("Connecting to the default database...");
        await storage.connection.connect();
        logger.info("Database connected.");
    }
    catch (err)
    {
        logger.error(err);
        logger.error("Fail to connect to the default database.");
        logger.info("Server is going to stop.");
        process.exit();
    }
}

async function loadSensors()
{
    await sensors.load();
}

function printStarLine()
{
    console.log("*".repeat(80));
}


startup();
