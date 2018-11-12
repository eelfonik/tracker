import { RouterState } from 'connected-react-router'

// ===============login/signup related types=================
interface UserProfile {
  email: string,
  username: string,
}

export interface LoginExtras {
  sessionId?: number,
  userId?: number,
  userProfileModel?: UserProfile,
  msg?: number,
}

export interface LoginReq {
  name?: string
  email: string,
  emailValid: boolean,
  pass: string,
}


export interface LoginRes {
  success: boolean,
  extras: LoginExtras,
}

export interface LoginState {
  readonly isLoggedIn: boolean,
  readonly notif: string,
  readonly extras: LoginExtras,
  readonly match: {
    url: string,
  },
}

// ====================user related types==================

export interface UserInfo {
  name: string,
  address: string,
  siret: string,
  phone: string
}

export interface UserExtras {
  userInfoModel: UserInfo,
  invoices?: Array<number>,
  clients?: Array<number>,
  userId: number,
}

export interface UserRes {
  success: boolean,
  extras: UserExtras,
}

export interface UserState {

}

export interface InvoiceState {

}

export interface UserInvoicesState {

}

export interface AppState {
  router: RouterState,
  login: LoginState,
  userInfo: UserState,
  invoiceInfo: InvoiceState,
  userInvoices: UserInvoicesState,
}

