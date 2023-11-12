import { EEmailAction } from "../enums/email.enum";

export const templates = {
  [EEmailAction.NOTBRAND]: {
    templateName: "cars",
    subject:
      "Hello! The dealer wants to specify a car brand that is not on the list!",
  },
};
