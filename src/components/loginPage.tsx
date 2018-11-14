import * as React from 'react';
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import { userLogin, resetNotif } from '../store/actions';
import { AppState, LoginState } from '../store/reducer'
import { LoginReq, ActionProps } from '../store/types'
import { InputBlock, OneLineInput } from '../commonStyles/form'
import { useLogin } from '../customHooks/useLogin'

type Props = LoginState & ActionProps

function LoginPage(props: Props) {
  const {
    email,
    emailValid,
    pass,
    changeMail,
    changePass
  } = useLogin(props.resetNotif)

  const formValidated = () => {
    return !!email && emailValid && !!pass;
  }

  const submitData = () => {
    if (formValidated()) {
      props.onLoginClick({email, pass, emailValid});
    } else {
      console.debug("The login is not correct");
    }
  }

  return (
    <div className="signup">
      <div>
        Peek what you've got
      </div>
      <InputBlock>
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
      {this.props.notif ? <div>{this.props.notif}</div> : null}
    </div>
  );
}

const mapStateToProps = (state:AppState) => {
  const { login } = state;
  return {
    isLoggedIn: login.isLoggedIn,
    // currentURL: ownProps.location.pathname,
    notif: login.notif,
    extras: login.extras
  }
}

// see the type definition of thunk here https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17829
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => ({
  onLoginClick: (value: LoginReq) => { dispatch(userLogin(value)) },
  resetNotif: () => { dispatch(resetNotif()) }
});

export default connect<LoginState, ActionProps, void>(mapStateToProps, mapDispatchToProps)(LoginPage);