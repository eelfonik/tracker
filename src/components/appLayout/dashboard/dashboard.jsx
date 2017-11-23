import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import NewInvoiceForm from '../newInvoiceForm/newInvoiceForm';
import NewInvoicePreview from '../newInvoicePreview/newInvoicePreview';
import { addNewInvoiceForUser } from 'store/actions';
import dashboardStyle from './dashboard.css';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.maybeRenderNotif = this.maybeRenderNotif.bind(this);
    }

    componentDidMount(){

    }

    maybeRenderNotif(){
        if (this.props.invoiceInfo.number) {
            return(
                <div>Invoice <span>{this.props.invoiceInfo.number}</span> created!</div>
            );
        }
    }

    maybeRenderPreview() {
        if (this.props.invoiceInfo.number) {
            return (
                <NewInvoicePreview data={this.props.invoiceInfo}/>
            );
        }
    }

    render() {
        return (
            <div className="home">
                <div className={dashboardStyle.header}>
                    Feed me a new invoice!
                </div>
                <NewInvoiceForm />
                {this.maybeRenderNotif()}
                {this.maybeRenderPreview()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invoiceInfo: state.invoiceInfo,
        //invoices:state.invoicesState
    }
}

const mapDispatchToProps = (dispatch) => ({
    submitData: (value) => dispatch(addNewInvoiceForUser(value)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);