import axios from 'axios';
import * as actions from './actionConstants'
import { action } from 'typesafe-actions';
import {Dispatch, Action} from 'redux'
import { AppState } from './reducer'
import { LoginReq, LoginRes, UserInfo, UserExtras, InvoiceInfo } from './types'

import mapApiErrorMessagesToNotif from '../helpers/mapApiErrorToNotif'
import { ThunkDispatch } from 'redux-thunk';

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

export const userLogin = (value: LoginReq) => 
  async (dispatch: Dispatch) => {
    const data = {
      email: value.email,
      password: value.pass,
    }
    try {
      const response = await axios.post('/api/account/login', data)
      dispatch(logIn(response.data))
    } catch (error) {
      console.log("login error!", error);
    }
  }

export const userSignup = (value: LoginReq) =>
  async (dispatch: Dispatch) => {
    const data = {
      username: value.name,
      email: value.email,
      password: value.pass,
      //normally should make user confirm again, but don't bother for now
      passwordConfirm: value.pass
    }

    try {
      const response = await axios.post('/api/account/signup', data)
      //the response.data is what we defined at controllers/serverRoutes.js as callback function
      //in the case of signup,
      //if data.success === false, the data.extras will have a msg to identify the problem
      //if data.success === true, data.extras will contain a userProfileModel with email and username
      dispatch(signUp(response.data));
    } catch (error) {
      console.log("signup error!", error);
    }
  }

export const userLogOut = () => 
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('/api/account/logout', {})
      console.debug("user logout success ", response);
      dispatch(logout());
      dispatch(removeInfo());
    } catch (error) {
      console.log("logout error!", error);
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

export const getUserInfo = () =>
  async (dispatch: Dispatch, getState: Function) => {
    dispatch(isFetchingUser());
    const isLoggedIn = getState().login.isLoggedIn;
    if (isLoggedIn) {
      try {
        const res = await axios.get('/api/user/info')
        dispatch(getInfo(res.data.extras));
      } catch (error) {
        console.log("get user info error!", error);
      }
    }
  }

export const updateUserInfo = (value: UserInfo) =>
  async (dispatch: Dispatch) => {
    const userInfo = {
      name: value.name,
      address: value.address,
      siret: value.siret,
      phone: value.phone
    }
    try {
      const res = await axios.post('/api/user/info', userInfo)
      console.debug("update user info success ", res);
      dispatch(updateInfo(res.data.extras.userInfoModel))
    } catch(error) {
      console.log("update user info error!", error);
    }
  }

// ====================invoices for a given user actions==================

export const addNewInvoice = (resData: InvoiceInfo) => action(actions.ADD_NEW_INVOICE, {...resData})

export const addNewInvoiceForUser = (value: InvoiceInfo) => 
  async (dispatch: ThunkDispatch<AppState, void, Action>) => {
    try {
      const res = await axios.post('/api/user/invoice', value)
      console.debug("add new invoice success ", res);
      dispatch(addNewInvoice(res.data.extras.invoiceInfoModel));
      //every time a new invoice is added, should also dispatch getUserInvoices
      dispatch(getUserInvoices());
    } catch(error) {
      console.log("add new invoice error!", error);
    }
  }

export const getInvoices = (resData: Array<InvoiceInfo>) => action(actions.GET_USER_INVOICES, {
  invoices: resData
})

export const getUserInvoices = () => 
  async (dispatch: Dispatch, getState: Function) => {
    if (getState().login.isLoggedIn) {
      try {
        const res = await axios.get('/api/user/invoices', {})
        console.debug("get user invoices success ", res);
        dispatch(getInvoices(res.data.extras.invoices))
      } catch (error) {
        console.log("get user invoices error!", error);
      }
    }
  }

