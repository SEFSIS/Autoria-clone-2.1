import { EEmailAction } from "../enums/email.action.enum";

export const templates = {
  [EEmailAction.REGISTER]: {
    templateName: "register",
    subject:
      "Hello, great to see you in our app. Would you like to receive an additional package of services?",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Do not worry, we control your password.",
  },
  [EEmailAction.INACTIVE]: {
    templateName: "inactive",
    subject: "There was a problem when placing an ad for a new car.",
  },
};
