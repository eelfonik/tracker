import * as React from "react";
import { connect } from "react-redux";
import {AppState} from '../store/types'
import {InvoiceInfo} from '../store/types'
import UserInvoiceCard from "./userInvoiceCard";
import InvoicesTrends from './InvoicesTrends';

function UserInvoices(props: {userInvoices: Array<InvoiceInfo>}) {
  return (
    <div>
      {props.userInvoices.map(invoice => (
        <UserInvoiceCard key={invoice.number} invoiceData={invoice} />
      ))}
      <InvoicesTrends userInvoices={props.userInvoices}/>
    </div>
  )
}

function mapStateToProps(state: AppState) {
  return {
    userInvoices: state.userInvoices.invoices
  };
}

export default connect(mapStateToProps)(UserInvoices);
