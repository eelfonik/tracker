import * as React from "react";
import { connect } from "react-redux";
import styled, {css} from 'styled-components'
import {AppState} from '../store/types'

const InvoiceWrapper = styled.div`
  padding: 20px;
  border: 1px dashed black;
  box-shadow: 3px 3px 2px #888888;
`

const VerticalBase = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`

const InvoiceHeader = styled.div`
 ${VerticalBase}
 align-items: flex-end;
  & .headerInfo,
  & .clientInfo {}
`

const Header = styled.div`
  font-size:1.5em;
  font-weight: 700;
  color: rgb(0, 234, 107);
`

const SmallHeader = styled.span`
  font-size: 1.1em;
  font-weight: 700;
`

const FactureInfo = styled.div`
  composes: verticalBase;
  align-items: center;
`

const IncomeInfo = styled.div`
  composes: verticalBase;
  align-items: flex-start;
  & .incomeDesc {
      margin-right:10px;
  }
  & .incomeSum {
      min-width: 8em;
  }
`

const TaxAdditionalText = styled.div`
  font-size: 0.6em;
  margin: 10px 0;
`

function NewInvoicePreview(props) {

  const maybeRenderSiret = () => {
    if (!!props.data.client.siret) {
      return <div>SIRET: {props.data.client.siret}</div>;
    }
  }

  const maybeRenderDesc = () => {
    if (!!props.data.description) {
      return (
        <div className='incomeDesc'>
          <SmallHeader>
            Designation
          </SmallHeader>
          <hr />
          {props.data.description}
        </div>
      );
    }
  }

  const taxIsZeroOrUndefined = () => {
    return (
      parseFloat(props.data.taxRate) === 0 ||
      props.data.taxRate === ""
    );
  }

  const calcTva = () => {
    if (!taxIsZeroOrUndefined()) {
      return parseFloat(
        (
          parseFloat(props.data.sum) *
          parseFloat(props.data.taxRate) /
          100
        ).toFixed(2)
      );
    }
    return 0
  }

  const calcSum = () => {
    return parseFloat(parseFloat(props.data.sum).toFixed(2));
  }

  const maybeRenderAdditionalTaxText = () => {
    if (taxIsZeroOrUndefined()) {
      return (
        <TaxAdditionalText>
          TVA non applicable, article 239B du code général des impôts
        </TaxAdditionalText>
      );
    } else {
      return (
        <TaxAdditionalText>
          TVA {props.data.taxRate}% : {calcTva()}{" "}
          {props.data.currency}
        </TaxAdditionalText>
      );
    }
  }

  const renderTotal = () => {
    const total = taxIsZeroOrUndefined()
      ? calcSum()
      : calcSum() + calcTva();
    return (
      <div>
        <SmallHeader>TOTAL</SmallHeader>
        <hr />
        {total} {props.data.currency}
      </div>
    );
  }

  const maybeRenderClient = () => {
    if (props.data.client) {
      return (
        <div className='clientInfo'>
          <Header>Client</Header>
          <div>{props.data.client.name}</div>
          <div>{props.data.client.address}</div>
          {maybeRenderSiret()}
        </div>
      );
    } else {
      return (
        <div className='clientInfo'>
          please add client info
        </div>
      );
    }
  }
  const invoice = props.data;
  const maybeMail = props.profile ? props.profile.email : "";

  if (invoice.number !== "") {
    return (
      <InvoiceWrapper>
        <InvoiceHeader>
          <div className='headerInfo'>
            <Header>
              {props.name}
            </Header>
            <div>{props.address}</div>
            <div>{props.phone}</div>
            <div>{maybeMail}</div>
            <div>SIRET:{props.siret}</div>
          </div>
          {maybeRenderClient()}
        </InvoiceHeader>

        <FactureInfo>
          <div>
            <SmallHeader>
              Facture
            </SmallHeader>{" "}
            {invoice.number}
          </div>
          <div>{invoice.date}</div>
        </FactureInfo>

        <IncomeInfo>
          {maybeRenderDesc()}
          <div className='incomeSum'>
            <SmallHeader>
              Montant HT
            </SmallHeader>
            <hr />
            {calcSum()} {invoice.currency}
            {maybeRenderAdditionalTaxText()}
          </div>
        </IncomeInfo>

        <div>{renderTotal()}</div>
      </InvoiceWrapper>
    );
  } else {
    return <div>no data yet</div>;
  }
}

const mapStateToProps = (state: AppState) => ({
  name: state.userInfo.name,
  address: state.userInfo.address,
  siret: state.userInfo.siret,
  phone: state.userInfo.phone,
  profile: state.login.extras.userProfileModel
});


export default connect(mapStateToProps)(NewInvoicePreview);
