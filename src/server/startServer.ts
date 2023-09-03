import "dotenv/config";

import debugCreator from "debug";
import app from "./index.js";

debugCreator.enable("rackets:server:start");

const debug = debugCreator("rackets:server:start");

const startServer = (port: string | number) => {
  app.listen(+port, () => {
    debug(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
