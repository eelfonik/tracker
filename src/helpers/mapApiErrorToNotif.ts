function mapApiErrorMessagesToNotif(msg: number) : string {
  switch (msg) {
    case 0:
      return "Email not found";
    case 1:
      return "Invalid Password";
    case 2:
      return "Error with database";
    case 3:
      return "The famous not found";
    case 4:
      return "Email already exists!";
    case 5:
      return "Can't create user";
    case 6:
      return "Password reset expired :-(";
    case 7:
      return "Password reset failed";
    case 8:
      return "Password rest email incorrect";
    case 9:
      return "Can't reset password";
    case 10:
      return "Please enter the same password to confirm";
    case 11:
      return "Invoice with same number already exists";
    case 12:
      return "Can't create invoice";
    case 13:
      return "Can't create invoice for user";
    default:
      return "";
  }
}

export default mapApiErrorMessagesToNotif