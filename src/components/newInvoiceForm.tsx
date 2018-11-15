import * as React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import styled from 'styled-components'
import {FormError, InputBlock, OneLineInput, Textarea} from '../commonStyles/form'

import { addNewInvoiceForUser } from "../store/actions";

const FormContainer = styled.div`
  /*background-color: rgba(0, 234, 107,0.5);*/
  /*padding: 20px;*/
  /*border: 1px dashed black;*/
  /*border-radius: 5px;*/
  /*box-shadow: 3px 3px 2px #888888;*/
`

const TaxPercentageSign = styled.span`
  line-height: 2;
`

const CurrencyPicker = styled.div`
  width: 4em;
  margin: 0 10px 0 5px;
  line-height: 2;
  position: relative;
  :after {
    content: "";
    position: absolute;
    display: block;
    top:calc(50% - 5px);
    right:5px;
    width:0px;
    height: 0px;
    border-top: 10px solid rgba(0, 234, 107, 0.5);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    background-color: white;
  }
`

const CurrencyUnitContainer = styled.select`
  border: 0;
  appearance: none;
  width: 100%;
  padding: 10px;
  & .currencyUnit {
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    transition: max-height 0.5s ease, background-color 0.5s ease;
  }
`

const defaultCurrency = "€";
const currencyList = [
      {sign: "€", unit: "EUR" },
      {sign: "$", unit: "USD" },
      {sign: "¥", unit: "RMB" },
      {sign: "£", unit: "GBP" }
    ];

function NewInvoiceForm(props) {
  state = {
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

  resetStates() {
    setState({
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
      state.sumValid &&
      !!state.number &&
      state.invoiceNumValid &&
      !!state.sum &&
      !!state.date &&
      !!state.client.name &&
      !!state.client.address
    );
  }

  changeNumber = (event) => {
    if (isNumber(event.target.value) || event.target.value === "") {
      // console.debug("numbers!");
      setState({
        number: event.target.value,
        invoiceNumValid: true
      });
    } else {
      setState({
        invoiceNumValid: false
      });
    }
  }

  changeDate = (event) => {
    setState({ date: event.target.value });
  }

  changeSum = (event) => {
    if (isNumber(event.target.value) || event.target.value === "") {
      setState({
        sum: event.target.value,
        sumValid: true
      });
    } else {
      setState({
        sumValid: false
      });
    }
  }

  updateCurrencyUnit = (e) => {
    setState({
      currency: e.target.value,
    });
  }

  changeTaxRate = (event) => {
    if (
      (isNumber(event.target.value) &&
        event.target.value >= 0 &&
        event.target.value <= 100) ||
      event.target.value === ""
    ) {
      setState({
        taxRate: event.target.value
      });
    }
  }

  changeClient = (field, event) => {
    const newClient = { ...state.client, [field]: event.target.value };
    setState({
      client: newClient
    });
  }

  changeDesc(event) {
    setState({ description: event.target.value });
  }

  submitForm = () => {
    if (formValidated()) {
      const returnedState = R.pick([
        "number",
        "date",
        "sum",
        "taxRate",
        "currency",
        "description"
      ], state);
      const addDefaultCurrency = {
        ...returnedState,
        currency: returnedState.currency
          ? returnedState.currency
          : defaultCurrency
      };
      props.submitData(addDefaultCurrency);
      resetStates();
    } else {
      setState({
        showSubmitError: true
      });
    }
  }

  maybeRenderInvoiceNumError() {
    if (!state.invoiceNumValid) {
      return (
        <FormError>Don't put letters in Invoice NO</FormError>
      );
    }
  }

  maybeRenderSumError() {
    if (!state.sumValid) {
      return <FormError>Don't put letters in Sum</FormError>;
    }
  }

  maybeRenderSubmitError() {
    if (state.showSubmitError) {
      return (
        <FormError>
          Please fill all required fields :-)
        </FormError>
      );
    }
  }

  renderCurrencyPicker() {
    const selectedCurrency = state.currency || defaultCurrency;
    // see useful currency signs here:
    // https://gist.github.com/Gibbs/3920259
    // and http://htmlarrows.com/currency/
    return (
      <CurrencyPicker>
        <CurrencyUnitContainer defaultValue={selectedCurrency} onChange={updateCurrencyUnit}>
          {currencyList.map(currency => (
            <option key={currency.unit} value={currency.sign}>
              {`${currency.sign} ${currency.unit}`}
            </option>
          ))}
        </CurrencyUnitContainer>
      </CurrencyPicker>
    );
  }

  render() {
    return (
      <FormContainer>
        {/*use html5 input type number in react will lost control*/}
        {/*see https://github.com/facebook/react/issues/1549*/}
        <InputBlock>
          <input
            type="text"
            value={state.number}
            placeholder="invoice No."
            onChange={changeNumber}
          />
          {maybeRenderInvoiceNumError()}
        </InputBlock>
        <InputBlock>
          <input
            type="date"
            value={state.date}
            placeholder="Choose a date"
            onChange={changeDate}
          />
        </InputBlock>
        <InputBlock>
          <input
            type="text"
            value={state.sum}
            placeholder="income without tax"
            onChange={changeSum}
          />
          {renderCurrencyPicker()}
          <input
            type="text"
            value={state.taxRate}
            placeholder="tax rate"
            onChange={changeTaxRate}
          />
          <TaxPercentageSign>%</TaxPercentageSign>
          {maybeRenderSumError()}
        </InputBlock>

        <InputBlock>
          <OneLineInput
            type="text"
            value={state.client.name}
            placeholder="client "
            onChange={e => changeClient("name", e)}
          />
          <OneLineInput
            type="text"
            value={state.client.address}
            placeholder="client address"
            onChange={e => changeClient("address", e)}
          />
          <OneLineInput
            type="text"
            value={state.client.siret}
            placeholder="client siret (optional)"
            onChange={e => changeClient("siret", e)}
          />
        </InputBlock>
        <InputBlock>
          <Textarea
            rows={4}
            placeholder="add descriptions (optional)"
            onChange={changeDesc}
            value={state.description}
          />
        </InputBlock>
        <button onClick={submitForm}>submit</button>
        {maybeRenderSubmitError()}
      </FormContainer>
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
