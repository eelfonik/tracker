import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { render } from 'react-dom';
import classNames from 'classnames';
import style from './newInvoiceForm.css';
import formStyle from '../../../../commonStyles/form.css';

import {addNewInvoiceForUser} from '../../../../store/actions';

class NewInvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            invoiceNumValid:true,
            date:'',
            sum:'',
            currencyUnitsVisibility: false,
            defaultCurrency:'€',
            currentCurrency:'',
            currency:'',
            taxRate:'',
            sumValid:true,
            client:{
                name:'',
                address:'',
                siret:''
            },
            description:'',
            focused: false,
            showSubmitError: false,
            userIsTyping: false
        };
        this.changeNumber = this.changeNumber.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.toggleCurrencyUnits = this.toggleCurrencyUnits.bind(this);
        this.changeTaxRate = this.changeTaxRate.bind(this);
        // this.changeClient = this.changeClient.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetStates= this.resetStates.bind(this);
        this.isNumber = this.isNumber.bind(this);
        this.formValidated = this.formValidated.bind(this);
        this.renderCurrencyPicker = this.renderCurrencyPicker.bind(this);
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
            currencyUnitsVisibility: false,
            defaultCurrency:'€',
            currentCurrency:'',
            currency:this.state.currentCurrency,
            taxRate:'',
            sumValid: true,
            client:{
                name:'',
                address:'',
                siret:''
            },
            description:'',
            focused: false,
            showSubmitError: false,
            userIsTyping: false
        });
    }

    isNumber(value){
        //test only numbers
        //see http://stackoverflow.com/a/10713754/6849186
        // return /^-?\d*(\.\d+)?$/.test(value);
        // the above not working for float number, so change it
        //see http://stackoverflow.com/a/1830632/6849186
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    formValidated(){
        return this.state.sumValid && !!this.state.number && this.state.invoiceNumValid && !!this.state.sum && !!this.state.date && !!this.state.client.name && !!this.state.client.address;
    }

    changeNumber(event) {
        if (this.isNumber(event.target.value)|| event.target.value === '') {
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
        if (this.isNumber(event.target.value)|| event.target.value === '') {
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

    updateCurrencyUnit(currency){
        switch(currency) {
            case 'euro':
                this.setState({
                    currentCurrency:"€",
                    currency:"€",
                    currencyUnitsVisibility: false
                });
                break;
            case 'pound':
                this.setState({
                    currentCurrency:'£',
                    currency:'£',
                    currencyUnitsVisibility: false
                });
                break;
            case 'yen':
                this.setState({
                    currentCurrency:'¥',
                    currency:'¥',
                    currencyUnitsVisibility: false
                });
                break;
            case 'dollar':
                this.setState({
                    currentCurrency:'$',
                    currency:'$',
                    currencyUnitsVisibility: false
                });
                break;
            default:
                this.setState({
                    currentCurrency:this.state.defaultCurrency,
                    currency:this.state.defaultCurrency,
                    currencyUnitsVisibility: false
                });
        }
    }

    changeTaxRate(event) {
        if (this.isNumber(event.target.value) && event.target.value>=0 && event.target.value<=100 || event.target.value === '') {
            this.setState({
                taxRate: event.target.value
            });
        } else {

        }
    }

    changeClient(target,event) {
            let copy = {};
            switch (target) {
                case 'name':
                    copy = Object.assign({}, this.state.client, {name:event.target.value});
                    break;
                case 'address':
                    copy = Object.assign({}, this.state.client, {address:event.target.value});
                    break;
                case 'siret':
                    copy = Object.assign({}, this.state.client, {siret:event.target.value});
                    break;
                default:
                    copy = Object.assign({}, this.state.client);
            }

            this.setState({
                client: copy
            });
    }


    changeDesc(event) {
        this.setState({description: event.target.value});
    }

    submitForm(){
        if (this.formValidated()) {
            const returnedState = _.pick(this.state,['number','date','sum','taxRate','currency','description']);
            console.debug("returned state", returnedState);
            this.props.submitData(returnedState);
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
                <div className={formStyle.error}>Don't put letters in Invoice NO</div>
            );
        }
    }

    maybeRenderSumError(){
        if (!this.state.sumValid) {
            return (
                <div className={formStyle.error}>Don't put letters in Sum</div>
            );
        }
    }

    maybeRenderSubmitError(){
        if (this.state.showSubmitError) {
            return (
                <div className={formStyle.error}>Please fill all required fields :-)</div>
            );
        }
    }

    toggleCurrencyUnits(){
        this.setState({
            currencyUnitsVisibility: !this.state.currencyUnitsVisibility
        });
    }

    renderCurrencyPicker() {
        const currencyUnitClasses = classNames(
            style.currencyUnit,
            this.state.currencyUnitsVisibility?style.currencyVisible:""
        );
        // see useful currency signs here:
        // https://gist.github.com/Gibbs/3920259
        // and http://htmlarrows.com/currency/
        return (
            <div className={style.currencyPicker}>
                <div
                    className={style.currentCurrency}
                    onClick={this.toggleCurrencyUnits}
                >
                    <span>{!!this.state.currentCurrency?this.state.currentCurrency:this.state.defaultCurrency}</span>
                    <span className={style.arrow}>&#8893;</span>
                </div>
                <ul className={style.currencyUnitContainer}>
                    <li
                        className={currencyUnitClasses}
                        onClick={()=>this.updateCurrencyUnit('euro')}
                    >
                        &euro;&#160;EUR
                    </li>
                    <li
                        className={currencyUnitClasses}
                        onClick={()=>this.updateCurrencyUnit('pound')}
                    >
                        &pound;&#160;GBP
                    </li>
                    <li
                        className={currencyUnitClasses}
                        onClick={()=>this.updateCurrencyUnit('yen')}
                    >
                        &yen;&#160;RMB
                    </li>
                    <li
                        className={currencyUnitClasses}
                        onClick={()=>this.updateCurrencyUnit('dollar')}
                    >
                        &#36;&#160;USD
                    </li>
                </ul>
            </div>
        );
    }

    render(){
        return(
            <div className={style.formContainer}>
                {/*use html5 input type number in react will lost control*/}
                {/*see https://github.com/facebook/react/issues/1549*/}
                <div className={formStyle.input}>
                    <input
                        type="text"
                        value={this.state.number}
                        placeholder="invoice No."
                        onChange={this.changeNumber}
                    />
                    {this.maybeRenderInvoiceNumError()}
                </div>
                <div className={formStyle.input}>
                    <input
                        type="date"
                        value={this.state.date}
                        placeholder="Choose a date"
                        onChange={this.changeDate}
                    />
                </div>
                <div className={formStyle.input}>
                    <input
                        type="text"
                        value={this.state.sum}
                        placeholder="income without tax"
                        onChange={this.changeSum}
                    />
                    {this.renderCurrencyPicker()}
                    <input
                        type="text"
                        value={this.state.taxRate}
                        placeholder="tax rate"
                        onChange={this.changeTaxRate}
                    /><span className={style.taxPercentageSign}>%</span>
                    {this.maybeRenderSumError()}
                </div>

                <div className={formStyle.input}>
                    <input
                        className={formStyle.onelineInput}
                        type="text"
                        value={this.state.client.name}
                        placeholder="client name"
                        onChange={e => this.changeClient('name',e)}
                    />
                    <input
                        className={formStyle.onelineInput}
                        type="text"
                        value={this.state.client.address}
                        placeholder="client address"
                        onChange={e => this.changeClient('address',e)}
                    />
                    <input
                        className={formStyle.onelineInput}
                        type="text"
                        value={this.state.client.siret}
                        placeholder="client siret (optional)"
                        onChange={e => this.changeClient('siret',e)}
                    />
                </div>
                <div className={formStyle.input}>
                    <textarea
                        rows="4"
                        placeholder="add descriptions (optional)"
                        onChange={this.changeDesc}
                        value={this.state.description}
                    >
                    </textarea>
                </div>
            <button onClick={this.submitForm}>submit</button>
                {this.maybeRenderSubmitError()}
            </div>
        )
    }
}

// NewInvoiceForm.propTypes = {
//     submitData: React.PropTypes.func
// };

const mapDispatchToProps = (dispatch) => {
    return {
        submitData: (value) => {
            dispatch(addNewInvoiceForUser(value));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(NewInvoiceForm);
