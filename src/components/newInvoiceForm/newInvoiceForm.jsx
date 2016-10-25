import React from 'react';
import { render } from 'react-dom';
import style from './newInvoiceForm.css';

export default class NewInvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            invoiceNumValid:true,
            date:'',
            sum:'',
            client:'',
            desc:'',
            focused: false
        };
        this.changeNumber = this.changeNumber.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.changeClient = this.changeClient.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetStates= this.resetStates.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.maybeRenderInvoiceNumError = this.maybeRenderInvoiceNumError.bind(this);
    }

    resetStates(){
        this.setState({
            number: '',
            invoiceNumValid:true,
            date:'',
            sum:'',
            client:'',
            desc:'',
            focused: false
        });
    }

    isNumber(value){
        //test only numbers
        //see http://stackoverflow.com/a/10713754/6849186
        return !/\D/.test(value);
    }

    changeNumber(event) {
        if (this.isNumber(event.target.value)) {
            // console.debug("numbers!");
            this.setState({
                number: event.target.value,
                invoiceNumValid: true
            });
        } else {
            this.setState({
                invoiceNumValid: false
            });
        }
    }


    changeDate(event) {
        this.setState({date: event.target.value});
    }

    changeSum(event) {
        if (this.isNumber(event.target.value)) {
            console.debug("numbers!");
            this.setState({sum: event.target.value});
        } else {
            console.debug("not number");
        }
    }

    changeClient(event) {
        this.setState({client: event.target.value});
    }

    changeDesc(event) {
        this.setState({desc: event.target.value});
    }

    submitForm(){
        this.props.submitData(this.state);
        this.resetStates();
        //alert("success@@@");
    }

    maybeRenderInvoiceNumError(){
        if (!this.state.invoiceNumValid) {
            return (
                <div className={style.error}>Don't put letters in Invoice NO</div>
            );
        }
    }

    render(){
        return(
            <div className={style.formContainer}>
                {/*use html5 input type number in react will lost control*/}
                {/*see https://github.com/facebook/react/issues/1549*/}
                <div className={style.input}>
                    <input
                        type="text"
                        value={this.state.number}
                        placeholder="invoice No."
                        onChange={this.changeNumber}
                    />
                    {this.maybeRenderInvoiceNumError()}
                </div>
                <input
                    className={style.input}
                    type="date"
                    value={this.state.date}
                    placeholder="Choose a date"
                    onChange={this.changeDate}
                />
                <input
                    className={style.input}
                    type="number"
                    value={this.state.sum}
                    placeholder="income without tax"
                    onChange={this.changeSum}
                />
                <input
                    className={style.input}
                    type="text"
                    value={this.state.client}
                    placeholder="client name"
                    onChange={this.changeClient}
                />
                <textarea
                    className={style.input}
                    rows="4"
                    placeholder="add desc"
                    onChange={this.changeDesc}
                    value={this.state.desc}
                >
                </textarea>
            <button onClick={this.submitForm}>submit</button>
            </div>
        )
    }
}

NewInvoiceForm.propTypes = {
    submitData: React.PropTypes.func
};
