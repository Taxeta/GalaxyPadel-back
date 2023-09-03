import cors from "cors";
import express from "express";

const corsOptions = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
  methods: "GET, POST, DELETE, PATCH",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json());

app.get("/");

export default app;
