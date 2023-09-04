import "dotenv/config";

import chalk from "chalk";
import debugCreator from "debug";
import app from "./index.js";

const debug = debugCreator("rackets:server:start");

const startServer = (port: string | number) => {
  app.listen(+port, () => {
    debug(chalk.green(`Listening on http://localhost:${port}`));
  });
};

export default startServer;
