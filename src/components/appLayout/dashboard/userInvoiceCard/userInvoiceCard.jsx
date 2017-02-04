import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
//import style from './userInfo.css';
import formStyle from '../../../../commonStyles/form.css';
import userInvoiceCardStyle from './userInvoiceCard.css';

class UserInvoiceCard extends React.Component {

    render(){
        const data = this.props.invoiceData;
        return(
            <div className={userInvoiceCardStyle.wrap}>
                {data.number}
                {data.date}
                {data.sum}
                {data.currency}
                {data.taxRate}
                {data.description}
            </div>
        )
    }
}

UserInvoiceCard.propTypes= {
    invoiceData: React.PropTypes.object.isRequired
}

export default UserInvoiceCard;