import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { adminRouter } from "./routers/admin.router";
import { authAdminRouter } from "./routers/auth-admin.router";
import { authClientRouter } from "./routers/auth-client.router";
import { authDealerRouter } from "./routers/auth-dealer.router";
import { authManagerRouter } from "./routers/auth-manager.router";
import { carRouter } from "./routers/car.router";
import { clientRouter } from "./routers/client.router";
import { dealerRouter } from "./routers/dealer.router";
import { managerRouter } from "./routers/manager.router";
import { premiumRouter } from "./routers/premium.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cars", carRouter);
app.use("/managers", managerRouter);
app.use("/admins", adminRouter);
app.use("/clients", clientRouter);
app.use("/dealers", dealerRouter);
app.use("/auth-dealer", authDealerRouter);
app.use("/auth-client", authClientRouter);
app.use("/auth-admin", authAdminRouter);
app.use("/auth-manager", authManagerRouter);
app.use("/premiums", premiumRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);

  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
