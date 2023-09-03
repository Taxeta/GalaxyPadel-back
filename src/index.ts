import debugCreator from "debug";
import "dotenv/config";
import startServer from "./server/startServer.js";

const debug = debugCreator("rackets:server:start");

const port = process.env.PORT ?? 4000;

debug("Connected");
startServer(port);
