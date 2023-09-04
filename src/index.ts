import "dotenv/config";

import chalk from "chalk";
import debugCreator from "debug";
import startServer from "./server/startServer.js";

const debug = debugCreator("rackets:server:start");

const port = process.env.PORT ?? 4000;

debug(chalk.green("Connected to database"));

startServer(port);
