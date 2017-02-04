import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import {getUserInvoices} from '../../../../store/actions';
//import style from './userInfo.css';
import formStyle from '../../../../commonStyles/form.css';
import UserInvoiceCard from '../userInvoiceCard/userInvoiceCard';

class UserInvoices extends React.Component {

    componentDidMount(){
        this.props.getInvoices();
    }

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

const mapDispatchToProps = (dispatch) => {
    return {
        getInvoices: ()=>{dispatch(getUserInvoices())}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInvoices);