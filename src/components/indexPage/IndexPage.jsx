import React from 'react';
import { render } from 'react-dom';
import NewInvoiceForm from '../newInvoiceForm/newInvoiceForm';
import NewInvoicePreview from '../newInvoicePreview/newInvoicePreview';
//import AthletePreview from './AthletePreview';
//import athletes from '../data/athletes';
import style from './indexPage.css';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            date:'',
            sum:'',
            client:'',
            desc:''
        };
        this.submitData = this.submitData.bind(this);
        this.maybeRenderNotif = this.maybeRenderNotif.bind(this);
    }

    submitData(data){
        //alert("wooooo");
        console.log(data);
        this.setState({
            number: data.number,
            date:data.date,
            sum:data.sum,
            client:data.client,
            desc:data.desc
        });
    }

    maybeRenderNotif(){
        if (this.state.number !== '') {
            return(
                <div>Invoice <span>{this.state.number}</span> created!</div>
            );
        }
    }

    render() {
        //console.debug(this.props);
        return (
            <div className="home">
                <div className={style.header}>
                    Feed me a new invoice!
                </div>
                <NewInvoiceForm submitData={this.submitData}/>
                {this.maybeRenderNotif()}
                <NewInvoicePreview data={this.state}/>
            </div>
        );
    }
}