import * as React from 'react'
import {InvoiceInfo} from '../store/types'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// import * as R from 'ramda'

function InvoicesTrends(props: {userInvoices: Array<InvoiceInfo>}) {
  const sums = props.userInvoices.map(invoice => ({date: invoice.date, sum: invoice.sum}))
  return (
    <LineChart width={600} height={300} data={sums}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )
}

export default InvoicesTrends