import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  FormError,
  InputBlock,
  OneLineInput,
  Textarea
} from "../commonStyles/form";
import { ThunkDispatch } from "redux-thunk";
import { InvoiceInfo, Action } from "../store/types";
import { useInvoiceForm } from "../customHooks/useInvoiceForm";

import { addNewInvoiceForUser } from "../store/actions";
type DispatchProps = {
  submitData: (val: InvoiceInfo) => void;
};

const FormContainer = styled.div`
  /*background-color: rgba(0, 234, 107,0.5);*/
  /*padding: 20px;*/
  /*border: 1px dashed black;*/
  /*border-radius: 5px;*/
  /*box-shadow: 3px 3px 2px #888888;*/
`;

const TaxPercentageSign = styled.span`
  line-height: 2;
`;

const CurrencyPicker = styled.div`
  width: 4em;
  margin: 0 10px 0 5px;
  line-height: 2;
  position: relative;
  :after {
    content: "";
    position: absolute;
    display: block;
    top: calc(50% - 5px);
    right: 5px;
    width: 0px;
    height: 0px;
    border-top: 10px solid rgba(0, 234, 107, 0.5);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    background-color: white;
  }
`;

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
`;

const defaultCurrency = "€";
const currencyList = [
  { sign: "€", unit: "EUR" },
  { sign: "$", unit: "USD" },
  { sign: "¥", unit: "RMB" },
  { sign: "£", unit: "GBP" }
];

function NewInvoiceForm(props: DispatchProps) {
  const {
    number,
    date,
    sum,
    currency,
    taxRate,
    clientName,
    clientAddress,
    clientSiret,
    description,
    showSubmitError,
    changeNumber,
    changeDate,
    changeSum,
    changeCurrency,
    changeTaxRate,
    changeClientName,
    changeClientAddress,
    changeClientSiret,
    changeDescription,
    formValid,
    invoiceNumValid,
    sumValid,
    resetStates
  } = useInvoiceForm();

  const formValidated = formValid && !!number && !!sum;

  const submitForm = () => {
    if (formValidated) {
      const returnedState = {
        number,
        date,
        sum,
        taxRate,
        currency,
        description,
        client: {
          name: clientName,
          address: clientAddress,
          siret: clientSiret,
        }
      };
      const withDefaultCurrency = {
        ...returnedState,
        currency: returnedState.currency
          ? returnedState.currency
          : defaultCurrency
      };
      props.submitData(withDefaultCurrency);
      resetStates();
    }
  };

  const renderCurrencyPicker = () => {
    const selectedCurrency = currency || defaultCurrency;
    // see useful currency signs here:
    // https://gist.github.com/Gibbs/3920259
    // and http://htmlarrows.com/currency/
    return (
      <CurrencyPicker>
        <CurrencyUnitContainer
          defaultValue={selectedCurrency}
          onChange={changeCurrency}
        >
          {currencyList.map(currency => (
            <option key={currency.unit} value={currency.sign}>
              {`${currency.sign} ${currency.unit}`}
            </option>
          ))}
        </CurrencyUnitContainer>
      </CurrencyPicker>
    );
  };
  return (
    <FormContainer>
      {/*use html5 input type number in react will lost control*/}
      {/*see https://github.com/facebook/react/issues/1549*/}
      <InputBlock>
        <input
          type="text"
          value={number}
          placeholder="invoice No."
          onChange={changeNumber}
        />
        {!invoiceNumValid && (
          <FormError>Don't put letters in Invoice NO</FormError>
        )}
      </InputBlock>
      <InputBlock>
        <input
          type="date"
          value={date}
          placeholder="Choose a date"
          onChange={changeDate}
        />
      </InputBlock>
      <InputBlock>
        <input
          type="text"
          value={sum}
          placeholder="income without tax"
          onChange={changeSum}
        />
        {renderCurrencyPicker()}
        <input
          type="text"
          value={taxRate}
          placeholder="tax rate"
          onChange={changeTaxRate}
        />
        <TaxPercentageSign>%</TaxPercentageSign>
        {!sumValid && <FormError>Don't put letters in Sum</FormError>}
      </InputBlock>

      <InputBlock>
        <OneLineInput
          type="text"
          value={clientName}
          placeholder="client "
          onChange={changeClientName}
        />
        <OneLineInput
          type="text"
          value={clientAddress}
          placeholder="client address"
          onChange={changeClientAddress}
        />
        <OneLineInput
          type="text"
          value={clientSiret}
          placeholder="client siret (optional)"
          onChange={changeClientSiret}
        />
      </InputBlock>
      <InputBlock>
        <Textarea
          rows={4}
          placeholder="add descriptions (optional)"
          onChange={changeDescription}
          value={description}
        />
      </InputBlock>
      <button onClick={submitForm}>submit</button>
      {showSubmitError && (
        <FormError>Please fill all required fields :-)</FormError>
      )}
    </FormContainer>
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<InvoiceInfo, void, Action>
) => {
  return {
    submitData: (value: InvoiceInfo) => {
      dispatch(addNewInvoiceForUser(value));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewInvoiceForm);
