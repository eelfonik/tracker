import * as React from 'react';
import styled from 'styled-components'
import {InvoiceInfo} from '../store/types'
import NewInvoicePreview from './newInvoicePreview';

const Wrap = styled.div`
  padding:20px;
  margin: 10px;
  border: 1px dashed black;
  border-radius: 2px;
  box-shadow: 3px 3px 2px #888888;
`

function UserInvoiceCard(props: {invoiceData: InvoiceInfo}) {
  const [showPreview, setPreview] = React.useState(false)

  const togglePreview = () => {
    setPreview(!showPreview)
  }

  const data = props.invoiceData;
  return(
    <Wrap onClick={togglePreview}>
      {data.number}
      {data.date}
      {data.sum}
      {data.currency}
      {data.taxRate}
      {data.description}
      {showPreview && <NewInvoicePreview data={data}/>}
    </Wrap>
  )
}

export default UserInvoiceCard;