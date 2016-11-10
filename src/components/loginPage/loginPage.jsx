import React from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import {userLogin} from '../../store/actions';
import style from './loginPage.css';
import formStyle from '../../commonStyles/form.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            emailValid: true,
            pass:'',
        };
        this.changeMail = this.changeMail.bind(this);
        this.changePass = this.changePass.bind(this);
        this.submitData = this.submitData.bind(this);
        this.isEmail = this.isEmail.bind(this);
        this.formValidated = this.formValidated.bind(this);
    }

    //direct router on front-end after success login using react-router
    //see http://stackoverflow.com/a/39608907/6849186
    //moving this part to parent component

    componentDidMount(){

    }

    isEmail(value){
        //test emails
        //see http://stackoverflow.com/a/1373724/6849186
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    formValidated(){
        return !!this.state.email && this.state.emailValid && !!this.state.pass;
    }

    changeMail(e){
        if (this.isEmail(e.target.value)) {
            this.setState({
                email: e.target.value,
                emailValid: true
            });
        } else {
            this.setState({
                email: e.target.value,
                emailValid: false
            });
        }
    }

    changePass(e){
        this.setState({
            pass: e.target.value
        });
    }


    submitData(){
        if (this.formValidated()) {
            this.props.onLoginClick(this.state);
        } else {
            console.debug("The login is not correct");
        }
    }


    render() {
        return (
            <div className="signup">
                <div>
                    Peek what you've got
                </div>
                <div className={formStyle.input}>
                    <input
                        className={formStyle.onelineInput}
                        type="text"
                        value={this.state.email}
                        placeholder="your email"
                        onChange={this.changeMail}
                    />
                    <input
                        className={formStyle.onelineInput}
                        type="password"
                        value={this.state.pass}
                        placeholder="your password"
                        onChange={this.changePass}
                    />
                </div>
                <button onClick = {this.submitData}>submit!</button>
            </div>
        );
    }
}

// const mapStateToProps = (state, ownProps) => {
//     console.log(state); // state
//     console.log(ownProps); // ownProps
//     return {
//         number: state
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (value) => {
            dispatch(userLogin(value))
        }
    }
}
//if we don't use mapStateToProps, we should pass null as 1st argument
//see http://stackoverflow.com/a/38708606/6849186
export default connect(null,mapDispatchToProps)(LoginPage);