
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

import { connectRouter, RouterState } from 'connected-react-router'
import { combineReducers } from 'redux';
import { History } from 'history'
import {Login, User} from './types'
import { ActionType, getType, StateType } from 'typesafe-actions';
import * as actions from './actions'

export type Action = ActionType<typeof actions>;

export function loginReducer(state: Login = {}, action: Action) {
  switch (action.type) {
    case getType(actions.logIn):
    case getType(actions.signUp):
      return {
        ...state,
        ...action.payload
      };
    case getType(actions.logout):
      return {
        ...state,
        ...action.payload
      }
    case getType(actions.resetNotif):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
}

export type LoginState = StateType<typeof loginReducer>;

export function UserInfoReducer(state: User = { isFetching: false }, action: Action) {
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
      return { isFetching: false };
    default:
      return state
  }
}

export type UserInfoState = StateType<typeof UserInfoReducer>

export function InvoiceInfoReducer(state = {}, action: Action) {
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

export type InvoiceInfoState = StateType<typeof InvoiceInfoReducer>

export function UserInvoicesReducer(state = {}, action: Action) {
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

export type UserInvoicesState = StateType<typeof UserInvoicesReducer>

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  login: loginReducer,
  userInfo: UserInfoReducer,
  invoiceInfo: InvoiceInfoReducer,
  userInvoices: UserInvoicesReducer,
})

export type AppState = {
  router: RouterState,
  login: LoginState,
  userInfo: UserInfoState,
  invoiceInfo: InvoiceInfoState,
  userInvoices: UserInvoicesState,
};

export default createRootReducer;