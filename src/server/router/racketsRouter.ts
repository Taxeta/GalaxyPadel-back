import express from "express";
import { getRackets } from "../controllers/racketsController/racketsControllers.js";
import paths from "../paths/paths.js";

const racketsRouter = express.Router();

racketsRouter.get(paths.rootPath, getRackets);

export default racketsRouter;
