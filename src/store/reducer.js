
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

import { combineReducers } from 'redux';


const initialLoginState = {
    isLoggedIn: false,
    redirectUrl: '/',
    notif:'',
    extras: {},
}

export function loginReducer(state = initialLoginState, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'SIGNUP':
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn,
                redirectUrl: action.redirectUrl,
                notif:action.notif,
                extras: action.extras
            });
        case 'LOGOUT':
            return initialLoginState;
        case 'RESET_NOTIF':
            return Object.assign({}, state, {
                notif:''
            });
        default:
            return state
    }
}

//here the initial state should get from server
// const initialUserInfoState = {
//     name:"",
//     address:"",
//     siret:"",
//     phone:""
// }


export function UserInfoReducer(state = {isFetching:false}, action) {
    switch (action.type) {
        case 'FETCHING_USER_INFO':
        case 'UPDATING_USER_INFO':
            return Object.assign({},state,{
                isFetching: true
            });
        case 'GET_INFO':
        case 'UPDATE_INFO':
            return Object.assign({}, state, {
                isFetching:false,
                name: action.name,
                address: action.address,
                siret:action.siret,
                phone: action.phone,
                invoices: action.invoices
            });
        case 'REMOVE_INFO':
            return {isFetching:false};
        default:
            return state
    }
}

export function InvoiceInfoReducer(state={}, action) {
    switch (action.type) {
        case 'GET_INVOICE_INFO':
            return Object.assign({}, state, {

            });
    }
}

const reducer = combineReducers({
    login: loginReducer,
    userInfo: UserInfoReducer,
})

export default reducer;