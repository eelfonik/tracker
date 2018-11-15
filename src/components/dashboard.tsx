import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import NewInvoiceForm from "./newInvoiceForm";
import NewInvoicePreview from './newInvoicePreview';
import { addNewInvoiceForUser } from "../store/actions";
import { Action, AppState, InvoiceInfoState } from "../store/types";
import styled from "styled-components";

const Header = styled.div`
  font-size: 28px;
  line-height: 2;
`;
function Dashboard(props: InvoiceInfoState) {
  const {number} = props
  return (
    <div className="home">
      <Header>Feed me a new invoice!</Header>
      <NewInvoiceForm />
      {number &&
        <div>
          Invoice <span>{props.number}</span> created!
        </div>
      }
      {number && <NewInvoicePreview data={props} />}
    </div>
  );
}

const mapStateToProps = (state: AppState): InvoiceInfoState => {
  return state.invoiceInfo;
  //invoices:state.invoicesState
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, Action>
) => ({
  submitData: (value: any) => dispatch(addNewInvoiceForUser(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
