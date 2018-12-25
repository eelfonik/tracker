import * as React from 'react'
import {InvoiceInfo} from '../store/types'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
// import * as R from 'ramda'

function InvoicesTrends(props: {userInvoices: Array<InvoiceInfo>, chartType: string}) {
  const sums = props.userInvoices.map(invoice => ({date: invoice.date, sum: invoice.sum}))
  return props.chartType === 'line' ? (
    <LineChart width={600} height={300} data={sums}>
      <Line type="monotone" dataKey="sum" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  ) : (
    <BarChart width={730} height={250} data={sums}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sum" fill="#82ca9d" />
    </BarChart>
  )
}

export default InvoicesTrends