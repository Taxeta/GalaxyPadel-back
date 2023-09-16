import express from "express";
import {
  addRacket,
  deleteRacket,
  getRackets,
  getRacketsById,
} from "../controllers/racketsController/racketsControllers.js";
import paths from "../paths/paths.js";

const racketsRouter = express.Router();

racketsRouter.get(paths.rootPath, getRackets);
racketsRouter.delete(paths.deleteIdPath, deleteRacket);
racketsRouter.post(paths.rootPath, addRacket);
racketsRouter.get(paths.racketByIdPath, getRacketsById);

export default racketsRouter;
