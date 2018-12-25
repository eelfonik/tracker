import * as React from "react";
import { connect } from "react-redux";
import {AppState} from '../store/types'
import {InvoiceInfo} from '../store/types'
import UserInvoiceCard from "./userInvoiceCard";
import InvoicesTrends from './InvoicesTrends';
import { useFormField } from '../customHooks/useFormField'

const chartTypes = ['line', 'bar']

function UserInvoices(props: {userInvoices: Array<InvoiceInfo>}) {
  const [chartType, changeChartType] = useFormField('')
  return (
    <div>
      {props.userInvoices.map(invoice => (
        <UserInvoiceCard key={invoice.number} invoiceData={invoice} />
      ))}
      <select
        defaultValue={chartType}
        onChange={changeChartType}
      >
        {chartTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <InvoicesTrends userInvoices={props.userInvoices} chartType={chartType} />
    </div>
  )
}

function mapStateToProps(state: AppState) {
  return {
    userInvoices: state.userInvoices.invoices
  };
}

export default connect(mapStateToProps)(UserInvoices);
