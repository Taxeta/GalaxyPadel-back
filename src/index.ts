import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./server/startServer.js";

const debug = debugCreator("rackets:server:start");

const port = process.env.PORT ?? 4000;

const mongoDbUrl = process.env.MONGO_RACKETS_URL!;

try {
  await connectToDatabase(mongoDbUrl);

  debug(chalk.green("Connected to database"));

  startServer(port);
} catch (error: unknown) {
  debug(chalk.cyan("Error to connect with database"));
  debug(chalk.red((error as Error).message));

  process.exit(1);
}
