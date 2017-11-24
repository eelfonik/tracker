import React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { render } from "react-dom";
import PropTypes from "prop-types";
import newInvoiceFormStyle from "./newInvoiceForm.css";
import formStyle from "../../../commonStyles/form.css";

import { addNewInvoiceForUser } from "../../../store/actions";

class NewInvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultCurrency = "€";
    this.currencyList = [
      {sign: "€", unit: "EUR" },
      {sign: "$", unit: "USD" },
      {sign: "¥", unit: "RMB" },
      {sign: "£", unit: "GBP" }
    ];
    this.state = {
      number: "",
      invoiceNumValid: true,
      date: "",
      sum: "",
      currency: "",
      taxRate: "",
      sumValid: true,
      client: {
        name: "",
        address: "",
        siret: ""
      },
      description: "",
      focused: false,
      showSubmitError: false,
      userIsTyping: false
    };
  }

  resetStates() {
    this.setState({
      number: "",
      invoiceNumValid: true,
      date: "",
      sum: "",
      currency: "",
      taxRate: "",
      sumValid: true,
      client: {
        name: "",
        address: "",
        siret: ""
      },
      description: "",
      focused: false,
      showSubmitError: false,
      userIsTyping: false
    });
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
      this.state.sumValid &&
      !!this.state.number &&
      this.state.invoiceNumValid &&
      !!this.state.sum &&
      !!this.state.date &&
      !!this.state.client.name &&
      !!this.state.client.address
    );
  }

  changeNumber = (event) => {
    if (this.isNumber(event.target.value) || event.target.value === "") {
      // console.debug("numbers!");
      this.setState({
        number: event.target.value,
        invoiceNumValid: true
      });
    } else {
      this.setState({
        invoiceNumValid: false
      });
    }
  }

  changeDate = (event) => {
    this.setState({ date: event.target.value });
  }

  changeSum = (event) => {
    if (this.isNumber(event.target.value) || event.target.value === "") {
      this.setState({
        sum: event.target.value,
        sumValid: true
      });
    } else {
      this.setState({
        sumValid: false
      });
    }
  }

  updateCurrencyUnit = (e) => {
    this.setState({
      currency: e.target.value,
    });
  }

  changeTaxRate = (event) => {
    if (
      (this.isNumber(event.target.value) &&
        event.target.value >= 0 &&
        event.target.value <= 100) ||
      event.target.value === ""
    ) {
      this.setState({
        taxRate: event.target.value
      });
    }
  }

  changeClient = (field, event) => {
    const newClient = { ...this.state.client, [field]: event.target.value };
    this.setState({
      client: newClient
    });
  }

  changeDesc(event) {
    this.setState({ description: event.target.value });
  }

  submitForm = () => {
    if (this.formValidated()) {
      const returnedState = R.pick([
        "number",
        "date",
        "sum",
        "taxRate",
        "currency",
        "description"
      ], this.state);
      const addDefaultCurrency = {
        ...returnedState,
        currency: returnedState.currency
          ? returnedState.currency
          : this.defaultCurrency
      };
      this.props.submitData(addDefaultCurrency);
      this.resetStates();
    } else {
      this.setState({
        showSubmitError: true
      });
    }
  }

  maybeRenderInvoiceNumError() {
    if (!this.state.invoiceNumValid) {
      return (
        <div className={formStyle.error}>Don't put letters in Invoice NO</div>
      );
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

  renderCurrencyPicker() {
    const selectedCurrency = this.state.currency || this.defaultCurrency;
    // see useful currency signs here:
    // https://gist.github.com/Gibbs/3920259
    // and http://htmlarrows.com/currency/
    return (
      <div className={newInvoiceFormStyle.currencyPicker}>
        <select className={newInvoiceFormStyle.currencyUnitContainer} defaultValue={selectedCurrency} onChange={this.updateCurrencyUnit}>
          {this.currencyList.map(currency => (
            <option key={currency.unit} value={currency.sign}>
              {`${currency.sign} ${currency.unit}`}
            </option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div className={newInvoiceFormStyle.formContainer}>
        {/*use html5 input type number in react will lost control*/}
        {/*see https://github.com/facebook/react/issues/1549*/}
        <div className={formStyle.input}>
          <input
            type="text"
            value={this.state.number}
            placeholder="invoice No."
            onChange={this.changeNumber}
          />
          {this.maybeRenderInvoiceNumError()}
        </div>
        <div className={formStyle.input}>
          <input
            type="date"
            value={this.state.date}
            placeholder="Choose a date"
            onChange={this.changeDate}
          />
        </div>
        <div className={formStyle.input}>
          <input
            type="text"
            value={this.state.sum}
            placeholder="income without tax"
            onChange={this.changeSum}
          />
          {this.renderCurrencyPicker()}
          <input
            type="text"
            value={this.state.taxRate}
            placeholder="tax rate"
            onChange={this.changeTaxRate}
          />
          <span className={newInvoiceFormStyle.taxPercentageSign}>%</span>
          {this.maybeRenderSumError()}
        </div>

        <div className={formStyle.input}>
          <input
            className={formStyle.onelineInput}
            type="text"
            value={this.state.client.name}
            placeholder="client "
            onChange={e => this.changeClient("name", e)}
          />
          <input
            className={formStyle.onelineInput}
            type="text"
            value={this.state.client.address}
            placeholder="client address"
            onChange={e => this.changeClient("address", e)}
          />
          <input
            className={formStyle.onelineInput}
            type="text"
            value={this.state.client.siret}
            placeholder="client siret (optional)"
            onChange={e => this.changeClient("siret", e)}
          />
        </div>
        <div className={formStyle.input}>
          <textarea
            rows="4"
            placeholder="add descriptions (optional)"
            onChange={this.changeDesc}
            value={this.state.description}
          />
        </div>
        <button onClick={this.submitForm}>submit</button>
        {this.maybeRenderSubmitError()}
      </div>
    );
  }
}

// NewInvoiceForm.propTypes = {
//     submitData: PropTypes.func
// };

const mapDispatchToProps = dispatch => {
  return {
    submitData: value => {
      dispatch(addNewInvoiceForUser(value));
    }
  };
};

export default connect(null, mapDispatchToProps)(NewInvoiceForm);
