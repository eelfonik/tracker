import { createStore } from 'redux';
import {login} from './reducer';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
//const store = createStore(login);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
//see http://stackoverflow.com/a/37690899/6849186
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(
    login,
    persistedState,
    /* any middleware... */
)

store.subscribe(() =>
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
)

export default store;

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
//store.dispatch({ type: 'INCREMENT' })
// 1
//store.dispatch({ type: 'INCREMENT' })
// 2