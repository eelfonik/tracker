import * as React from "react";
import { connect } from "react-redux";
import NewInvoiceForm from "./newInvoiceForm";
import NewInvoicePreview from './newInvoicePreview';
import { AppState, InvoiceInfoState, InvoiceInfo } from "../store/types";
import styled from "styled-components";

type InvoiceData = InvoiceInfoState | InvoiceInfo

const Header = styled.div`
  font-size: 28px;
  line-height: 2;
`;
function Dashboard(props: InvoiceData) {
  return (
    <div className="home">
      <Header>Feed me a new invoice!</Header>
      <NewInvoiceForm />
      {props.number && 
        <React.Fragment>
          <div>
            Invoice <span>{props.number}</span> created!
          </div>
          <NewInvoicePreview data={props} />
        </React.Fragment>
      }
    </div>
  );
}

const mapStateToProps = (state: AppState): InvoiceInfoState => state.invoiceInfo

export default connect(
  mapStateToProps
)(Dashboard);
