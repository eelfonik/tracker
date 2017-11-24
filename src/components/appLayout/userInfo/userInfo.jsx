import * as R from "ramda";
import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
//import style from './userInfo.css';
import formStyle from "../../../commonStyles/form.css";
import { updateUserInfo } from "store/actions";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userInfo.name,
      address: this.props.userInfo.address,
      siret: this.props.userInfo.siret,
      phone: this.props.userInfo.phone,
      showSubmitError: false
    };
    this.submitForm = this.submitForm.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.formValidated = this.formValidated.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeSiret = this.changeSiret.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.maybeRenderSumError = this.maybeRenderSumError.bind(this);
    this.maybeRenderSubmitError = this.maybeRenderSubmitError.bind(this);
  }

  isNumber(value) {
    //test only numbers
    //see http://stackoverflow.com/a/10713754/6849186
    // return /^-?\d*(\.\d+)?$/.test(value);
    // the above not working for float number, so change it
    //see http://stackoverflow.com/a/1830632/6849186
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  formValidated() {
    return (
      !!this.state.name &&
      !!this.state.address &&
      !!this.state.siret &&
      !!this.state.phone
    );
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeAddress(event) {
    this.setState({ address: event.target.value });
  }

  changeSiret(event) {
    this.setState({ siret: event.target.value });
  }

  changePhone(event) {
    this.setState({ phone: event.target.value });
  }

  submitForm() {
    if (this.formValidated()) {
      this.props.onUpdateClick(
        R.pick(["name", "address", "siret", "phone"], this.state)
      );
      //this.resetStates();
    } else {
      this.setState({
        showSubmitError: true
      });
    }
  }

  maybeRenderSumError() {
    if (!this.state.sumValid) {
      return <div className={formStyle.error}>Don't put letters in Sum</div>;
    }
  }

  maybeRenderSubmitError() {
    if (this.state.showSubmitError) {
      return (
        <div className={formStyle.error}>
          Please fill all required fields :-)
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className={formStyle.input}>
          <input
            type="text"
            value={this.state.name || ""}
            placeholder="your name"
            onChange={this.changeName}
          />
        </div>
        <div className={formStyle.input}>
          <input
            type="text"
            value={this.state.address || ""}
            placeholder="your address"
            onChange={this.changeAddress}
          />
        </div>
        <div className={formStyle.input}>
          <input
            type="text"
            value={this.state.siret || ""}
            placeholder="your siret"
            onChange={this.changeSiret}
          />
        </div>
        <div className={formStyle.input}>
          <input
            type="text"
            value={this.state.phone || ""}
            placeholder="your phone number"
            onChange={this.changePhone}
          />
        </div>

        <button onClick={this.submitForm}>submit</button>
        {this.maybeRenderSubmitError()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userInfo: state.userInfo
  };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onStartUp:()=>{
//             dispatch(getUserInfo())
//         },
//         onUpdateClick: (value) => {
//             dispatch(updateUserInfo(value))
//         }
//     }
// }

export default connect(mapStateToProps, {
  onUpdateClick: updateUserInfo
})(UserProfile);
