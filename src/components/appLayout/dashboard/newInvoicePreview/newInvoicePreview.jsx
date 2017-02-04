import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import style from './newInvoicePreview.css';

class NewInvoicePreview extends React.Component {
    constructor(props) {
        super(props);
        this.maybeRenderDesc = this.maybeRenderDesc.bind(this);
        this.maybeRenderSiret = this.maybeRenderSiret.bind(this);
    }

    maybeRenderSiret(){
        if (!!this.props.data.client.siret) {
            return <div>SIRET: {this.props.data.client.siret}</div>;
        }
    }

    maybeRenderDesc(){
        if (!!this.props.data.description) {
            return (
                <div className={style.incomeDesc}>
                    <span className={style.smallHeader}>Designation</span>
                    <hr />
                    {this.props.data.description}
                </div>
            );
        }
    }

    taxIsZeroOrUndefined(){
        return parseFloat(this.props.data.taxRate) === 0 || this.props.data.taxRate ==='';
    }

    calcTva(){
        if(!this.taxIsZeroOrUndefined()) {
            return parseFloat((parseFloat(this.props.data.sum)*parseFloat(this.props.data.taxRate)/100).toFixed(2));
        }
    }

    calcSum() {
        return parseFloat(parseFloat(this.props.data.sum).toFixed(2));
    }

    maybeRenderAdditionalTaxText(){
        if (this.taxIsZeroOrUndefined()) {
            return (
                <div className={style.taxAdditionalText}>TVA non applicable, article 239B du code général des impôts</div>
            );
        } else {
            return (
                <div className={style.taxAdditionalText}>
                    TVA {this.props.data.taxRate}% : {this.calcTva()} {this.props.data.currency}
                </div>
            );
        }
    }

    renderTotal(){
            const total = this.taxIsZeroOrUndefined()?this.calcSum():this.calcSum()+this.calcTva();
            return (
                <div>
                    <span className={style.smallHeader}>TOTAL</span>
                    <hr />
                    {total} {this.props.data.currency}
                </div>
            );
    }

    maybeRenderClient(){
        if (this.props.data.client) {
            return(
                <div className={style.clientInfo}>
                    <div className={style.header}>Client</div>
                    <div>{client.name}</div>
                    <div>{client.address}</div>
                    {this.maybeRenderSiret()}
                </div>
            );
        } else {
            return(
                <div className={style.clientInfo}>
                    please add client info
                </div>
            )
        }
    }

    render(){
        const invoice = this.props.data;
        const maybeMail = this.props.profile?this.props.profile.email:'';
        if (invoice.number !== ''){
            return (
                <div className={style.invoiceWrapper}>
                    <div className={style.invoiceHeader}>
                        <div className={style.headerInfo}>
                            <div className={style.header}>{this.props.name}</div>
                            <div>{this.props.address}</div>
                            <div>{this.props.phone}</div>
                            <div>{maybeMail}</div>
                            <div>SIRET:{this.props.siret}</div>
                        </div>
                        {this.maybeRenderClient()}
                    </div>

                    <div className={style.factureInfo}>
                        <div><span className={style.smallHeader}>Facture</span> {invoice.number}</div>
                        <div>{invoice.date}</div>
                    </div>

                    <div className={style.incomeInfo}>
                        {this.maybeRenderDesc()}
                        <div className={style.incomeSum}>
                            <span className={style.smallHeader}>Montant HT</span>
                            <hr />
                            {this.calcSum()} {invoice.currency}
                            {this.maybeRenderAdditionalTaxText()}
                        </div>
                    </div>

                    <div>
                        {this.renderTotal()}
                    </div>

                </div>
            );
        } else {
            return <div>no data yet</div>
        }
    }
}

NewInvoicePreview.propTypes = {
    data: React.PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
    name: state.userInfo.name,
    address: state.userInfo.address,
    siret: state.userInfo.siret,
    phone: state.userInfo.phone,
    profile: state.login.extras.userProfileModel
});


NewInvoicePreview = connect(
    mapStateToProps,
)(NewInvoicePreview);

export default NewInvoicePreview;