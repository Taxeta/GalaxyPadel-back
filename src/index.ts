import "dotenv/config";

import debugCreator from "debug";
import startServer from "./server/startServer.js";

const debug = debugCreator("rackets:server:start");

const port = process.env.PORT ?? 4000;

debug("Connected");
startServer(port);
