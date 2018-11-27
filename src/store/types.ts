
// N.B. if we use graphQl (more precisely, the apollo-client), there're tools automatically generate types for typescript
// see https://github.com/apollographql/apollo-tooling#code-generation

// ===============login/signup related types=================
export type UserProfile = {
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
  emailValid?: boolean,
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
  match: {
    url: string,
  },
}

// ====================user related types==================

export type UserInfo = {
  name?: string,
  address?: string,
  siret?: string,
  phone?: string
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

export type UserActionProps = {
  getInfo: () => void,
  getInvoices: () => void,
  onLogoutClick: () => void,
  onUpdateClick: (value: UserInfo) => void
}



// ====================invoice related types==================
export type InvoiceInfo = {
  _creator?: string,
  number: string,
  date : string,
  sum : string,
  taxRate : string,
  currency : string,
  description : string,
  client: Client,
}

type InvoiceExtras = {
  invoiceInfoModel: InvoiceInfo,
  invoiceId: number,
}

export type InvoiceRes = {
  success: boolean,
  extras: InvoiceExtras
}


export interface Invoice extends Partial<InvoiceInfo>{
  invoiceId?: number,
}

// ====================all invoices for a certain user related types==================
export type Client = {
  name: string,
  address: string,
  siret?: string,
}
export type UserInvoices = {
  invoices: Array<InvoiceInfo>
}


