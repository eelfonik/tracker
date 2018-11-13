import * as React from 'react';
import {Dispatch} from 'redux'
import { connect } from 'react-redux';
import { InputBlock, OneLineInput } from '../commonStyles/form'
import { userSignup, resetNotif } from '../store/actions';
import { LoginReq } from '../store/types'

interface SignUpProps {
  onSignupClick: (value: LoginReq) => void;
  resetNotif: () => void; 
} 

class SignupPage extends React.Component<SignUpProps, LoginReq> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      name: '',
      email: '',
      emailValid: true,
      pass: '',
    };
  }

  componentDidMount() {
    this.props.resetNotif();
  }
  componentWillUnmount() {
    this.props.resetNotif();
  }

  isEmail(value: LoginReq['email']) {
    //test emails
    //see http://stackoverflow.com/a/1373724/6849186
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
  }

  formValidated = () => {
    return !!this.state.name && !!this.state.email && this.state.emailValid && !!this.state.pass;
  }

  changeName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      name: e.currentTarget.value
    });
  }

  changeMail = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.isEmail(e.currentTarget.value)) {
      this.setState({
        email: e.currentTarget.value,
        emailValid: true
      });
      return;
    }
    this.setState({
      email: e.currentTarget.value,
      emailValid: false
    });
  }

  changePass = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      pass: e.currentTarget.value
    });
  }


  submitData = () => {
    if (this.formValidated()) {
      this.props.onSignupClick(this.state);
      return;
    }
    console.debug("The signUp is not correct");
  }


  render() {
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
            onChange={this.changeName}
          />
          <OneLineInput
            type="text"
            value={this.state.email}
            placeholder="your email"
            onChange={this.changeMail}
          />
          <OneLineInput
            type="password"
            value={this.state.pass}
            placeholder="your password"
            onChange={this.changePass}
          />
        </InputBlock>
        <button onClick={this.submitData}>submit!</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSignupClick: (value: LoginReq) => {
      dispatch(userSignup(value))
    },
    resetNotif: () => { dispatch(resetNotif()) }
});

//if we don't use mapStateToProps, we should pass null as 1st argument
//see http://stackoverflow.com/a/38708606/6849186
export default connect(null, mapDispatchToProps)(SignupPage);
