import * as React from 'react';
import {Action} from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import { InputBlock, OneLineInput } from '../commonStyles/form'
import { userSignup, resetNotif } from '../store/actions';
import { LoginReq, ActionProps } from '../store/types'
import { AppState } from '../store/reducer'
import { useLogin } from '../customHooks/useLogin'

function SignupPage(props: ActionProps) {
  const {
    name,
    email,
    emailValid,
    pass,
    changeMail,
    changePass,
    changeName
  } = useLogin(props.resetNotif)

  const formValidated = () => {
    return !!name && !!email && emailValid && !!pass;
  }

  const submitData = () => {
    if (formValidated()) {
      props.onSignupClick({name, email, pass, emailValid});
      return;
    }
    console.debug("The signUp is not correct");
  }

  return (
    <div className="signup">
      <div>
        Start the tracker
      </div>
      <InputBlock>
        <OneLineInput
          type="text"
          value={this.state.name}
          placeholder="your name"
          onChange={changeName}
        />
        <OneLineInput
          type="text"
          value={this.state.email}
          placeholder="your email"
          onChange={changeMail}
        />
        <OneLineInput
          type="password"
          value={this.state.pass}
          placeholder="your password"
          onChange={changePass}
        />
      </InputBlock>
      <button onClick={submitData}>submit!</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
    onSignupClick: (value: LoginReq) => {
      dispatch(userSignup(value))
    },
    resetNotif: () => { dispatch(resetNotif()) }
});

//if we don't use mapStateToProps, we should pass null as 1st argument
//see http://stackoverflow.com/a/38708606/6849186
export default connect(null, mapDispatchToProps)(SignupPage);
