export const initialLoginState = {
  isLoggedIn: false,
  notif: '',
  extras: {
    sessionId: undefined,
    userProfileModel: {
      email: '',
      username: ''
    },
    userId: undefined,
    msg: undefined
  },
  match: {
    url: '',
  },
}

export const initialUserInfoState = {
  isFetching: false
}

export const initialUserInvoicesState = {
  invoices: []
}