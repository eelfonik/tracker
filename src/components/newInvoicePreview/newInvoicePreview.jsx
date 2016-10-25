import React from 'react';
import { render } from 'react-dom';
import style from './newInvoicePreview.css';

export default class NewInvoicePreview extends React.Component {
    render(){
        console.debug(this.props.data);
        if (this.props.data.number !== ''){
            return <div>{this.props.data.number}</div>
        } else {
            return <div>no data yet</div>
        }
    }
}

NewInvoicePreview.propTypes = {
    data: React.PropTypes.object
};