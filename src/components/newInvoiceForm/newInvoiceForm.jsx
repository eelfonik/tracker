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
            sumValid:true,
            client:{
                name:'',
                address:'',
                siret:''
            },
            desc:'',
            focused: false,
            showSubmitError: false,
            userIsTyping: false
        };
        this.changeNumber = this.changeNumber.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.changeClientName = this.changeClientName.bind(this);
        this.changeClientAddress = this.changeClientAddress.bind(this);
        this.changeClientSiret = this.changeClientSiret.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetStates= this.resetStates.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.formValidated = this.formValidated.bind(this);
        this.maybeRenderInvoiceNumError = this.maybeRenderInvoiceNumError.bind(this);
        this.maybeRenderSumError = this.maybeRenderSumError.bind(this);
        this.maybeRenderSubmitError = this.maybeRenderSubmitError.bind(this);
    }

    resetStates(){
        this.setState({
            number: '',
            invoiceNumValid:true,
            date:'',
            sum:'',
            sumValid: true,
            client:{
                name:'',
                address:'',
                siret:''
            },
            desc:'',
            focused: false,
            showSubmitError: false,
            userIsTyping: false
        });
    }

    isNumber(value){
        //test only numbers
        //see http://stackoverflow.com/a/10713754/6849186
        return !/\D/.test(value);
    }

    formValidated(){
        return this.state.sumValid && this.state.invoiceNumValid && !!this.state.date && !!this.state.client.name && !!this.state.client.address;
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
            this.setState({
                sum: event.target.value,
                sumValid: true
            });
        } else {
            this.setState({
                sumValid :false
            });
        }
    }

    changeClientName(event) {
        const copy = Object.assign({}, this.state.client, {name:event.target.value});
        this.setState({
            //client: { ...this.state.client, name:event.target.value}
            client: copy
        });
    }

    changeClientAddress(event) {
        const copy = Object.assign({}, this.state.client, {address:event.target.value});
        this.setState({
            //client: { ...this.state.client, adress:event.target.value}
            client: copy
        });
    }

    changeClientSiret(event) {
        const copy = Object.assign({}, this.state.client, {siret:event.target.value});
        this.setState({
            //client: {...this.state.client, siret:event.target.value}
            client: copy
        });
    }

    changeDesc(event) {
        this.setState({desc: event.target.value});
    }

    submitForm(){
        if (this.formValidated()) {
            this.props.submitData(this.state);
            this.resetStates();
        } else {
            this.setState({
                showSubmitError: true
            });
        }
    }

    maybeRenderInvoiceNumError(){
        if (!this.state.invoiceNumValid) {
            return (
                <div className={style.error}>Don't put letters in Invoice NO</div>
            );
        }
    }

    maybeRenderSumError(){
        if (!this.state.sumValid) {
            return (
                <div className={style.error}>Don't put letters in Sum</div>
            );
        }
    }

    maybeRenderSubmitError(){
        if (this.state.showSubmitError) {
            return (
                <div className={style.error}>Please fill all required fields :-)</div>
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
                <div className={style.input}>
                    <input
                        type="date"
                        value={this.state.date}
                        placeholder="Choose a date"
                        onChange={this.changeDate}
                    />
                </div>
                <div className={style.input}>
                    <input
                        type="text"
                        value={this.state.sum}
                        placeholder="income without tax"
                        onChange={this.changeSum}
                    />
                    {this.maybeRenderSumError()}
                </div>

                <div className={style.input}>
                    <input
                        className={style.onelineInput}
                        type="text"
                        value={this.state.client.name}
                        placeholder="client name"
                        onChange={this.changeClientName}
                    />
                    <input
                        className={style.onelineInput}
                        type="text"
                        value={this.state.client.address}
                        placeholder="client address"
                        onChange={this.changeClientAddress}
                    />
                    <input
                        className={style.onelineInput}
                        type="text"
                        value={this.state.client.siret}
                        placeholder="client siret (optional)"
                        onChange={this.changeClientSiret}
                    />
                </div>

                <textarea
                    className={style.input}
                    rows="4"
                    placeholder="add descriptions (optional)"
                    onChange={this.changeDesc}
                    value={this.state.desc}
                >
                </textarea>
            <button onClick={this.submitForm}>submit</button>
                {this.maybeRenderSubmitError()}
            </div>
        )
    }
}

NewInvoiceForm.propTypes = {
    submitData: React.PropTypes.func
};
