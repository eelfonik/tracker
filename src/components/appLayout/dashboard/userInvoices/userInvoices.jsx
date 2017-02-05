import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
//import style from './userInfo.css';
import formStyle from '../../../../commonStyles/form.css';
import UserInvoiceCard from '../userInvoiceCard/userInvoiceCard';

class UserInvoices extends React.Component {

    renderInvoiceCard() {
        return this.props.userInvoices.map(invoice=> (
            <UserInvoiceCard key={invoice.number} invoiceData={invoice} />
        ));
    }

    render(){
        return(
            <div>
                {this.renderInvoiceCard()}
            </div>
        )
    }
}

UserInvoices.propTypes = {
    userInvoices: React.PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        userInvoices:state.userInvoices.invoices
    }
}

export default connect(
    mapStateToProps
)(UserInvoices);