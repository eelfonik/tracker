import * as React from 'react';
import * as states from './initialState'
import * as reducers from './reducer'
// import {login, userInfo, invoiceInfo, userInvoices} from './reducer'
import * as actions from './actions'

const { createContext, useContext, useReducer } = React;
const initialState = {
  login: states.initialLoginState,
  userInfo: states.initialUserInfoState,
  userInvoices: states.initialUserInvoicesState,
  invoiceInfo: {}
}

export type States = typeof initialState
type Actions = {
  [K in keyof typeof actions]: ReturnType<typeof actions[K]>
}
// to get union type from indexed object
// see https://stackoverflow.com/a/50044130
export type Action = Actions[keyof Actions]
type Reducers = {
  [K in keyof typeof reducers]: (state: Pick<States, K> , action: Action) => Pick<States, K>
}

// const rootReducer = (initialState: State, action: Action) => {
   
// }


const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const Provider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducers.login, initialState.login);
  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  )
}

export const useDispatch = () => {
  return useContext(dispatchCtx);
};

export const useGlobalState = <K extends keyof States>(property: K) => {
  const state = useContext(stateCtx);
  return state[property]; // only one depth selector for comparison
};
