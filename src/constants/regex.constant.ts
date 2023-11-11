export const regexConstant = {
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
  PHONE: /^\+?3?8?(0\d{9})$/,
  VAT_ID: /^\d{10}$/,
  BANK_CARD: /^\d{10}$/,
};
