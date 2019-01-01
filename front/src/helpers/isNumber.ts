
export function isNumber(value: any) {
  //test only numbers
  //see http://stackoverflow.com/a/10713754/6849186
  // return /^-?\d*(\.\d+)?$/.test(value);
  // the above not working for float number, so change it
  //see http://stackoverflow.com/a/1830632/6849186
  return !isNaN(parseFloat(value)) && isFinite(value);
}