
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
import { getType } from 'typesafe-actions';
import * as actions from './actions'
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
    case getType(actions.logIn):
    case getType(actions.signUp):
      return {
        ...state,
        ...action.payload
      };
    case getType(actions.resetNotif):
      return {
        ...state,
        ...action.payload,
      };
    case getType(actions.logout):
      return initialLoginState
    default:
      return initialLoginState
  }
}

const initialUserInfoState = {
  isFetching: false,
  name: '',
  address: '',
  siret: '',
  phone: ''
}

export function userInfoReducer(state: User = initialUserInfoState, action: Action): User {
  switch (action.type) {
    case getType(actions.isFetchingUser):
      return {
        ...state,
        ...action.payload
      };
    case getType(actions.getInfo):
    case getType(actions.updateInfo):
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };
    case getType(actions.removeInfo):
      return initialUserInfoState
    default:
      return initialUserInfoState
  }
}

export function invoiceInfoReducer(state: Invoice = {}, action: Action) {
  switch (action.type) {
    case getType(actions.addNewInvoice):
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
    case getType(actions.getInvoices):
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