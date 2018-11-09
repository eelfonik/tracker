class ApiMessages {
  constructor() {
    this.EMAIL_NOT_FOUND = 0;
    this.INVALID_PWD = 1;
    this.DB_ERROR = 2;
    this.NOT_FOUND = 3;
    this.EMAIL_ALREADY_EXISTS = 4;
    this.COULD_NOT_CREATE_USER = 5;
    this.PASSWORD_RESET_EXPIRED = 6;
    this.PASSWORD_RESET_HASH_MISMATCH = 7;
    this.PASSWORD_RESET_EMAIL_MISMATCH = 8;
    this.COULD_NOT_RESET_PASSWORD = 9;
    this.PASSWORD_CONFIRM_MISMATCH = 10;
    this.INVOICE_ALREADY_EXISTS = 11;
    this.COULD_NOT_CREATE_INVOICE = 12;
    this.COULD_NOT_CREATE_INVOICE_FOR_USER = 13;
  }
};

module.exports = ApiMessages;