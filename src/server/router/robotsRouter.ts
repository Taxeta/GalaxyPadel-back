import express from "express";
import { getRackets } from "../controllers/racketsController/racketsControllers.js";

const racketsRouter = express.Router();

racketsRouter.get("/", getRackets);

export default racketsRouter;
