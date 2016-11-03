import React from 'react';
import { render } from 'react-dom';
import style from './newInvoicePreview.css';

export default class NewInvoicePreview extends React.Component {
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
        if (!!this.props.data.desc) {
            return (
                <div className={style.incomeDesc}>
                    <span className={style.smallHeader}>Designation</span>
                    <hr />
                    {this.props.data.desc}
                </div>
            );
        }
    }

    taxIsZeroOrUndefined(){
        return parseFloat(this.props.data.taxRate) === 0 || this.props.data.taxRate ==='';
    }

    maybeRenderAdditionalTaxText(){
        if (this.taxIsZeroOrUndefined()) {
            return (
                <div className={style.taxAdditionalText}>TVA non applicable, article 239B du code général des impôts</div>
            );
        } else {
            return (
                <div className={style.taxAdditionalText}>
                    TVA {this.props.data.taxRate}% : {parseFloat(this.props.data.sum)*parseFloat(this.props.data.taxRate)/100} {this.props.data.currency}
                </div>
            );
        }
    }

    renderTotal(){
            const total = this.taxIsZeroOrUndefined()?parseFloat(this.props.data.sum):parseFloat(this.props.data.sum)*(1 + parseFloat(this.props.data.taxRate)/100);
            return (
                <div>
                    <span className={style.smallHeader}>TOTAL</span>
                    <hr />
                    {total} {this.props.data.currency}
                </div>
            );
    }

    render(){
        const invoice = this.props.data;
        const client = invoice.client;
        if (invoice.number !== ''){
            return (
                <div className={style.invoiceWrapper}>
                    <div className={style.invoiceHeader}>
                        <div className={style.headerInfo}>Your info here</div>
                        <div className={style.clientInfo}>
                            <div className={style.header}>Client</div>
                            <div>{client.name}</div>
                            <div>{client.address}</div>
                            {this.maybeRenderSiret()}
                        </div>
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
                            {invoice.sum} {invoice.currency}
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