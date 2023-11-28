import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { handleExchangeRate } from "./controllers/exchange.controller";
//import { cronRunner } from "./crons";
import { authRouter } from "./routers/auth.router";
import { carRouter } from "./routers/car.router";
import { checkRouter } from "./routers/check.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.post("/exchangeRate", async (req: Request, res: Response) => {
  // перенести
  return await handleExchangeRate(req, res);
});
app.use("/checks", checkRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  //cronRunner();
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
