import { LoginReq } from '../store/types'

const isEmail = (value: LoginReq['email']) => {
  //test emails
  //see http://stackoverflow.com/a/1373724/6849186
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}

export default isEmail