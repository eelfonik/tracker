import React from 'react';
// import { render } from 'react-dom';
import { connect } from 'react-redux';
import signupPageStyle from './signupPage.css';
import formStyle from '../../../commonStyles/form.css';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      emailValid: true,
      pass: '',
    };
    this.changeName = this.changeName.bind(this);
    this.changeMail = this.changeMail.bind(this);
    this.changePass = this.changePass.bind(this);
    this.submitData = this.submitData.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.formValidated = this.formValidated.bind(this);
  }

  componentDidMount() {
    console.debug("signup page is mounted!");
    //this.props.resetNotif();
  }
  componentWillUnmount() {
    this.props.resetNotif();
  }

  isEmail(value) {
    //test emails
    //see http://stackoverflow.com/a/1373724/6849186
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
  }

  formValidated() {
    console.debug("name", this.state.name, !!this.state.name, 'email', this.state.email, !!this.state.email, 'email valid?', this.state.emailValid, 'pw', this.state.pass, !!this.state.pass);
    return !!this.state.name && !!this.state.email && this.state.emailValid && !!this.state.pass;
  }

  changeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  changeMail(e) {
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

  changePass(e) {
    this.setState({
      pass: e.target.value
    });
  }


  submitData() {
    if (this.formValidated()) {
      this.props.onSignupClick(this.state);
    } else {
      console.debug("The signUp is not correct");
    }
  }


  render() {
    console.debug("check signuppage props", this.props);
    return (
      <div className="signup">
        <div>
          Start the tracker
                </div>
        <div className={formStyle.input}>
          <input
            className={formStyle.onelineInput}
            type="text"
            value={this.state.name}
            placeholder="your name"
            onChange={this.changeName}
          />
          <input
            className={formStyle.onelineInput}
            type="text"
            value={this.state.email}
            placeholder="your email"
            onChange={this.changeMail}
          />
          <input
            className={formStyle.onelineInput}
            type="password"
            value={this.state.pass}
            placeholder="your password"
            onChange={this.changePass}
          />
        </div>
        <button onClick={this.submitData}>submit!</button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSignupClick: (value) => {
//       dispatch(userSignup(value))
//     },
//     resetNotif: () => { dispatch(resetNotif()) }
//   }
// }
//if we don't use mapStateToProps, we should pass null as 1st argument
//see http://stackoverflow.com/a/38708606/6849186
// export default connect(null, mapDispatchToProps)(SignupPage);
export default SignupPage;
