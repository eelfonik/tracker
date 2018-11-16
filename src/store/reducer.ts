
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

//here the initial state should get from server right after create store
//see http://stackoverflow.com/a/33924707/6849186

// const initialUserInfoState = {
//     name:"",
//     address:"",
//     siret:"",
//     phone:""
// }

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';
import { History } from 'history'
import * as actions from './actionConstants'
import {Action, Login, User, Invoice, UserInvoices} from './types'

const initialLoginState = {
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

export function loginReducer(state: Login = initialLoginState, action: Action): Login {
  switch (action.type) {
    case actions.LOGIN:
    case actions.SIGNUP:
      return {
        ...state,
        ...action.payload
      };
    case actions.RESET_NOTIF:
      return {
        ...state,
        ...action.payload,
      };
    case actions.LOGOUT:
      return initialLoginState
    default:
      return state
  }
}

const initialUserInfoState = {
  isFetching: false
}

export function userInfoReducer(state: User = initialUserInfoState, action: Action): User {
  switch (action.type) {
    case actions.FETCHING_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    case actions.GET_INFO:
    case actions.UPDATE_INFO:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };
    case actions.REMOVE_INFO:
      return initialUserInfoState
    default:
      return state
  }
}

export function invoiceInfoReducer(state: Invoice = {}, action: Action) {
  switch (action.type) {
    case actions.ADD_NEW_INVOICE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
}

const initialUserInvoicesState = {
  invoices: []
}

export function userInvoicesReducer(state: UserInvoices = initialUserInvoicesState, action: Action) {
  switch (action.type) {
    case actions.GET_USER_INVOICES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
}

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  loginInfo: loginReducer,
  userInfo: userInfoReducer,
  invoiceInfo: invoiceInfoReducer,
  userInvoices: userInvoicesReducer,
})

export default createRootReducer;