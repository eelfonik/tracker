import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import NewInvoicePreview from '../newInvoicePreview/newInvoicePreview';

import {connect} from 'react-redux';
//import style from './userInfo.css';
import formStyle from '../../../commonStyles/form.css';
import userInvoiceCardStyle from './userInvoiceCard.css';

class UserInvoiceCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPreview: false
        };
    }

    togglePreview() {
        if (this.state.showPreview) {
            this.setState({
                showPreview:false
            });
        } else {
            this.setState({
                showPreview:true
            });
        }
    }

    maybeRenderPreview(){
        if (this.state.showPreview) {
            return <NewInvoicePreview data={this.props.invoiceData}/>
        }
    }

    render(){
        const data = this.props.invoiceData;
        return(
            <div className={userInvoiceCardStyle.wrap} onClick={(e)=>this.togglePreview()}>
                {data.number}
                {data.date}
                {data.sum}
                {data.currency}
                {data.taxRate}
                {data.description}
                {this.maybeRenderPreview()}
            </div>
        )
    }
}

UserInvoiceCard.propTypes= {
    invoiceData: React.PropTypes.object.isRequired,
}

export default UserInvoiceCard;