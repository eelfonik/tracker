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
                <div>
                    <span className={style.smallHeader}>Designation</span>
                    <hr />
                    {this.props.data.desc}
                </div>
            );
        }
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
                            {this.props.data.sum}
                        </div>
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