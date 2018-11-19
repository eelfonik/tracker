import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import { InputBlock, OneLineInput } from '../commonStyles/form'
import { userSignup, resetNotif } from '../store/actions';
import { LoginReq, LoginActionProps, AppState, Action } from '../store/types'
import { useLoginForm } from '../customHooks/useLoginForm'

function SignupPage(props: Pick<LoginActionProps, 'onSignupClick' | 'resetNotif'>) {
  const {
    name,
    email,
    pass,
    changeMail,
    changePass,
    changeName,
    signUpValid,
  } = useLoginForm(props.resetNotif)

  const submitData = () => {
    if (signUpValid) {
      props.onSignupClick({name, email, pass});
      return;
    }
    console.error("The signUp is not correct");
  }

  return (
    <div className="signup">
      <div>
        Start the tracker
      </div>
      <InputBlock>
        <OneLineInput
          type="text"
          value={name}
          placeholder="your name"
          onChange={changeName}
        />
        <OneLineInput
          type="text"
          value={email}
          placeholder="your email"
          onChange={changeMail}
        />
        <OneLineInput
          type="password"
          value={pass}
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
