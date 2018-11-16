import * as React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { AppState, UserInfo, UserProfile, InvoiceInfoState, InvoiceInfo } from "../store/types";

const InvoiceWrapper = styled.div`
  padding: 20px;
  border: 1px dashed black;
  box-shadow: 3px 3px 2px #888888;
`;

const VerticalBase = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const InvoiceHeader = styled.div`
  ${VerticalBase}
  align-items: flex-end;
  & .headerInfo,
  & .clientInfo {
  }
`;

const Header = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  color: rgb(0, 234, 107);
`;

const SmallHeader = styled.span`
  font-size: 1.1em;
  font-weight: 700;
`;

const FactureInfo = styled.div`
  ${VerticalBase}
  align-items: center;
`;

const IncomeInfo = styled.div`
  ${VerticalBase}
  align-items: flex-start;
  & .incomeDesc {
    margin-right: 10px;
  }
  & .incomeSum {
    min-width: 8em;
  }
`;

const TaxAdditionalText = styled.div`
  font-size: 0.6em;
  margin: 10px 0;
`;

type Props = {
  profile: UserProfile,
  data: InvoiceInfoState
}

function NewInvoicePreview(props: UserInfo & Props) {
  const invoice = props.data;
  const maybeMail = props.profile ? props.profile.email : "";

  const taxIsZeroOrUndefined = (taxRate: InvoiceInfo['taxRate']) => {
    return parseFloat(taxRate) === 0 || taxRate === "";
  };

  const calcTva = (sum: InvoiceInfo['sum'], taxRate: InvoiceInfo['taxRate']) => {
    if (!taxIsZeroOrUndefined(taxRate)) {
      return parseFloat(
        (
          (parseFloat(sum) * parseFloat(taxRate)) /
          100
        ).toFixed(2)
      );
    }
    return 0;
  };

  const calcSum = (sum: InvoiceInfo['sum']) => {
    return parseFloat(parseFloat(sum).toFixed(2));
  };

  const renderTotal = ({taxRate, sum, currency}: Pick<InvoiceInfo, 'taxRate' | 'sum' | 'currency'>) => {
    const total = taxIsZeroOrUndefined(taxRate) ? calcSum(sum) : calcSum(sum) + calcTva(sum, taxRate);
    return (
      <div>
        <SmallHeader>TOTAL</SmallHeader>
        <hr />
        {total} {currency}
      </div>
    );
  };

  const maybeRenderClient = () => !!invoice.client ? 
    <div className="clientInfo">
      <Header>Client</Header>
      <div>{invoice.client.name}</div>
      <div>{invoice.client.address}</div>
      {!!invoice.client.siret && <div>SIRET: {invoice.client.siret}</div>}
    </div> :
    <div className="clientInfo">please add client info</div>

  if (invoice.number !== "") {
    const {taxRate, sum, currency, description} = invoice
    return (
      <InvoiceWrapper>
        <InvoiceHeader>
          <div className="headerInfo">
            <Header>{props.name}</Header>
            <div>{props.address}</div>
            <div>{props.phone}</div>
            <div>{maybeMail}</div>
            <div>SIRET:{props.siret}</div>
          </div>
          {maybeRenderClient()}
        </InvoiceHeader>

        <FactureInfo>
          <div>
            <SmallHeader>Facture</SmallHeader> {invoice.number}
          </div>
          <div>{invoice.date}</div>
        </FactureInfo>

        <IncomeInfo>
          {!!description &&
            <div className="incomeDesc">
              <SmallHeader>Designation</SmallHeader>
              <hr />
              {description}
            </div>}
          <div className="incomeSum">
            <SmallHeader>Montant HT</SmallHeader>
            <hr />
            {sum && calcSum(sum)} {currency}
            <TaxAdditionalText>
              {taxRate && taxIsZeroOrUndefined(taxRate) ?
                "TVA non applicable, article 239B du code général des impôts" :
                `TVA ${taxRate}% : ${ sum && taxRate && calcTva(sum, taxRate)} ${currency}`
              }
            </TaxAdditionalText>
          </div>
        </IncomeInfo>
        <div>{sum && taxRate && currency && renderTotal({sum, taxRate, currency})}</div>
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
