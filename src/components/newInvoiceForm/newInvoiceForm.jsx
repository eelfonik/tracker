import React from 'react';
import { render } from 'react-dom';

export default class NewInvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            date:'',
            sum:'',
            client:'',
            desc:'',
            focused: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetStates= this.resetStates.bind(this);
    }

    resetStates(){
        this.setState({
            number: '',
            date:'',
            sum:'',
            client:'',
            desc:'',
            focused: false
        });
    }

    handleChange(event) {
        this.setState({number: event.target.value});
    }

    submitForm(){
        this.resetStates();
        //alert("sucesss@@@");
    }

    lightenTextOnFocus(){
        this.setState({
            focused: true
        });
    }

    render(){
        return(
            <div>
                <input
                    type="text"
                    value={this.state.number}
                    placeholder="ex: 16001"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    value={this.state.value}
                    placeholder="enter text here"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    value={this.state.value}
                    placeholder="enter text here"
                    onChange={this.handleChange}
                />
            <button onClick={this.submitForm}>submit</button>
            </div>
        )
    }
}