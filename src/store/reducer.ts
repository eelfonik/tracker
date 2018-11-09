
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

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions'
export type Action = ActionType<typeof actions>;

export function loginReducer(state = {}, action: Action) {
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

export function UserInfoReducer(state = { isFetching: false }, action: Action) {
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

export function InvoiceInfoReducer(state = {}, action: Action) {
  switch (action.type) {
    case getType(actions.GET_INVOICE_INFO):
    case getType(actions.ADD_NEW_INVOICE):
      return Object.assign({}, state, {
        number: action.number,
        date: action.date,
        sum: action.sum,
        taxRate: action.taxRate,
        currency: action.currency,
        description: action.description,
      });
    default:
      return state
  }
}

export function UserInvoicesReducer(state = {}, action: Action) {
  switch (action.type) {
    case getType(actions.GET_USER_INVOICES):
      return Object.assign({}, state, {
        invoices: action.invoices,
      });
    default:
      return state
  }
}

const reducer = combineReducers({
  router: routerReducer,
  login: loginReducer,
  userInfo: UserInfoReducer,
  invoiceInfo: InvoiceInfoReducer,
  userInvoices: UserInvoicesReducer,
})

export default reducer;