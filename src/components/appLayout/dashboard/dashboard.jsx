import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import NewInvoiceForm from '../newInvoiceForm/newInvoiceForm';
import NewInvoicePreview from '../newInvoicePreview/newInvoicePreview';
//import AthletePreview from './AthletePreview';
//import athletes from '../data/athletes';
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

// const mapDispatchToProps = (dispatch) => ({
//     submitData(value){
//             dispatch(addNewInvoiceForUser(value));
//         }
// });
//rather than pass a mapDispatchToProps function to connect,
//we can pass a **configuration object**
//that maps the name of callback function(here is `onLogoutClick`), and the action creator function(`userLogout` in this case)
//NOTE!! that only works with functions has no arguments!!!

export default connect(
    mapStateToProps,
    // {
    //     submitData:addNewInvoiceForUser
    // }
    // mapDispatchToProps
)(Dashboard);