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
  name?: string,
  email: string,
  emailValid: boolean,
  pass: string,
}


export interface LoginRes {
  success: boolean,
  extras: LoginExtras,
}

// the initial loginState definition
export interface Login {
  readonly isLoggedIn?: boolean,
  readonly notif?: string,
  readonly extras?: LoginExtras,
  readonly match?: {
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

export interface InvoiceState {

}

export interface UserInvoicesState {

}


