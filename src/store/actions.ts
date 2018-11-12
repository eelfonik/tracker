import axios from 'axios';
import * as actions from './actionConstants'
import { action } from 'typesafe-actions';
import { LoginReq, LoginRes, UserInfo, UserExtras } from './types'

import mapApiErrorMessagesToNotif from '../helpers/mapApiErrorToNotif'

// ===============login/signup related actions=================
export const signUp = ({success, extras} : LoginRes) => action(actions.SIGNUP, {
  isLoggedIn: success,
  notif: success ? '' : mapApiErrorMessagesToNotif(extras.msg),
  extras
})

export const logIn = ({success, extras} : LoginRes) => action(actions.LOGIN, {
  isLoggedIn: success,
  notif: success ? '' : mapApiErrorMessagesToNotif(extras.msg),
  extras
})

export const logout = () => action(actions.LOGOUT, {
  isLoggedIn: false,
  notif: '',
  extras: {},
})

export const resetNotif = () => action(actions.RESET_NOTIF, {
  notif: ''
})

export function userLogin(value: LoginReq) {
  return (dispatch, getState) => {
    const data = {
      email: value.email,
      password: value.pass,
    }
    axios.post('/api/account/login', data)
      .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
        return dispatch(logIn(response.data))
      })
      .catch((error) => {
        console.log("login error!", error);
      });
  }
}

export function userSignup(value: LoginReq) {
  return (dispatch, getState) => {
    const data = {
      username: value.name,
      email: value.email,
      password: value.pass,
      //normally should make user confirm again, but don't bother for now
      passwordConfirm: value.pass
    }

    axios.post('/api/account/signup', data)
      .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
        //the response.data is what we defined at controllers/serverRoutes.js as callback function
        //in the case of signup,
        //if data.success === false, the data.extras will have a msg to identify the problem
        //if data.success === true, data.extras will contain a userProfileModel with email and username
        return dispatch(signUp(response.data));
      })
      .catch((error) => {
        console.log("signup error!", error);
      });
  }
}

export function userLogOut() {
  return (dispatch) => {
    axios.get('/api/account/logout', {})
      .then((response) => {
        console.debug("user logout success ", response);
        dispatch(logout());
        dispatch(removeInfo());
      })
      .catch((error) => {
        console.log("logout error!", error);
      });
  }
}

// ====================user related actions once login==================

export const getInfo = (resData: UserExtras) => action(actions.GET_INFO, {
  name: resData.userInfoModel.name,
  address: resData.userInfoModel.address,
  siret: resData.userInfoModel.siret,
  phone: resData.userInfoModel.phone,
  invoices: resData.invoices,
})

export const updateInfo = (resData: UserInfo) => action(actions.UPDATE_INFO, {
  name: resData.name,
  address: resData.address,
  siret: resData.siret,
  phone: resData.phone
})

export const removeInfo = () => action(actions.REMOVE_INFO)

export const isFetchingUser = () => action(actions.FETCHING_USER_INFO, {
  isFetching: true
})

export function getUserInfo() {
  return (dispatch, getState) => {
    dispatch(isFetchingUser());
    const isLoggedIn = getState().login.isLoggedIn;
    if (isLoggedIn) {
      return axios.get('/api/user/info')
        .then((res) => {
          dispatch(getInfo(res.data.extras));
        })
        .catch((error) => {
          console.log("get user info error!", error);
        })
    }
  }
}

export function updateUserInfo(value: UserInfo) {
  return (dispatch, getState) => {
    const userInfo = {
      name: value.name,
      address: value.address,
      siret: value.siret,
      phone: value.phone
    }
    axios.post('/api/user/info', userInfo)
      .then((res) => {
        console.debug("update user info success ", res);
        dispatch(updateInfo(res.data.extras.userInfoModel))
      })
      .catch((error) => {
        console.log("update user info error!", error);
      });
  }
}

// ====================invoices for a given user actions==================

export const addNewInvoice = (resData) => action(actions.ADD_NEW_INVOICE, {
  number: resData.number,
  date: resData.date,
  sum: resData.sum,
  taxRate: resData.taxRate,
  currency: resData.currency,
  description: resData.description,
})

export function addNewInvoiceForUser(value) {
  return (dispatch, getState) => {
    axios.post('/api/user/invoice', value)
      .then((res) => {
        console.debug("add new invoice success ", res);
        dispatch(addNewInvoice(res.data.extras.invoiceInfoModel));
        //every time a new invoice is added, should also dispatch getUserInvoices
        dispatch(getUserInvoices());
      })
      .catch((error) => {
        console.log("add new invoice error!", error);
      });
  }
}

export const getInvoices = (resData) => action(actions.GET_USER_INVOICES, {
  invoices: resData
})

export function getUserInvoices() {
  return (dispatch, getState) => {
    if (getState().login.isLoggedIn) {
      axios.get('/api/user/invoices', {})
        .then((res) => {
          console.debug("get user invoices success ", res);
          dispatch(getInvoices(res.data.extras.invoices))
        })
        .catch((error) => {
          console.log("get user invoices error!", error);
        });
    }
  }
}
