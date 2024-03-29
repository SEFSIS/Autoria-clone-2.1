import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { configs } from "../configs/config";
import { templates } from "../constants/email.constant";
import { EEmailAction } from "../enums/email.action.enum";
import { ICar } from "../types/car.type";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts",
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials",
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string | string[],
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    const { subject, templateName } = templates[emailAction];

    context.frontUrl = configs.FRONT_URL;

    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  public async sendCustomMail(
    email: string,
    emailAction: EEmailAction,
    car: ICar,
    context: Record<string, string | number> = {},
  ) {
    const { subject, templateName } = templates[emailAction];
    const mailOptions = {
      from: "No reply",
      to: email,
      subject,
      template: templateName,
      context: {
        ...context,
        car,
      },
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
