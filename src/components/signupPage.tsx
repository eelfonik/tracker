import * as React from 'react';
import { connect } from 'react-redux';
import { InputBlock, OneLineInput } from '../commonStyles/form'
import { userSignup, resetNotif } from '../store/actions';
import { LoginReq } from '../store/types'

class SignupPage extends React.Component {
  constructor(props) {
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

  isEmail(value: string) {
    //test emails
    //see http://stackoverflow.com/a/1373724/6849186
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
  }

  formValidated = () => {
    return !!this.state.name && !!this.state.email && this.state.emailValid && !!this.state.pass;
  }

  changeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  changeMail = (e) => {
    if (this.isEmail(e.target.value)) {
      this.setState({
        email: e.target.value,
        emailValid: true
      });
    } else {
      this.setState({
        email: e.target.value,
        emailValid: false
      });
    }
  }

  changePass = (e) => {
    this.setState({
      pass: e.target.value
    });
  }


  submitData = () => {
    if (this.formValidated()) {
      this.props.onSignupClick(this.state);
    } else {
      console.debug("The signUp is not correct");
    }
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

const mapDispatchToProps = (dispatch) => ({
    onSignupClick: (value: LoginReq) => {
      dispatch(userSignup(value))
    },
    resetNotif: () => { dispatch(resetNotif()) }
});

//if we don't use mapStateToProps, we should pass null as 1st argument
//see http://stackoverflow.com/a/38708606/6849186
export default connect(null, mapDispatchToProps)(SignupPage);
