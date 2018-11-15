import * as actions from './actions'
import {loginReducer, userInfoReducer, invoiceInfoReducer, userInvoicesReducer} from './reducer'
import { ActionType, StateType } from 'typesafe-actions';
import { RouterState } from 'connected-react-router'

export type Action = ActionType<typeof actions>;

export type LoginState = StateType<typeof loginReducer>;

export type UserInfoState = StateType<typeof userInfoReducer>

export type InvoiceInfoState = StateType<typeof invoiceInfoReducer>

export type UserInvoicesState = StateType<typeof userInvoicesReducer>

export type AppState = {
  router: RouterState,
  login: LoginState,
  userInfo: UserInfoState,
  invoiceInfo: InvoiceInfoState,
  userInvoices: UserInvoicesState,
};
// ===============login/signup related types=================
type UserProfile = {
  email: string,
  username: string,
}

export type LoginExtras = {
  sessionId?: number,
  userId?: number,
  userProfileModel: UserProfile,
  msg?: number,
}

export type LoginReq = {
  name?: string,
  email: string,
  emailValid: boolean,
  pass: string,
}

export type LoginActionProps = {
  onLoginClick: (value: LoginReq) => void,
  onSignupClick: (value: LoginReq) => void,
  resetNotif: () => void 
}


export type LoginRes = {
  success: boolean,
  extras: LoginExtras,
}

// the initial loginState definition
export type Login = {
  isLoggedIn: boolean,
  notif: string,
  extras: LoginExtras,
  match?: {
    url: string,
  },
}

// ====================user related types==================

export type UserInfo = {
  name: string,
  address: string,
  siret: string,
  phone: string
}

export type UserExtras = {
  userInfoModel: UserInfo,
  invoices?: Array<number>,
  clients?: Array<number>,
  userId: number,
}

export type UserRes = {
  success: boolean,
  extras: UserExtras,
}

// Partial can extends interface with transformations
// It's called Mapped types
// There are 4 build-in definitions can be used:
// - Partial (turn properties from required to optional)
// - Readonly (create a readonly version)
// - Pick
// - Record
export interface User extends Partial<UserInfo> {
  isFetching: boolean,
  invoices?: Array<number>,
  clients?: Array<number>,
}

export type AppActionProps = {
  getInfo: () => void,
  getInvoices: () => void,
  onLogoutClick: () => void
}



// ====================invoice related types==================
export type InvoiceInfo = {
  _creator?: string,
  number: number,
  date : string,
  sum : number,
  taxRate : number,
  currency : string,
  description : string
}

type InvoiceExtras = {
  invoiceInfoModel: InvoiceInfo,
  invoiceId: number,
}

export type InvoiceRes = {
  success: boolean,
  extras: InvoiceExtras
}


export type Invoice = {

}

// ====================all invoices for a certain user related types==================
export type UserInvoices = {

}


