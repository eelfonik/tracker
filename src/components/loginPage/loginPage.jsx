import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
//import NewInvoiceForm from '../newInvoiceForm/newInvoiceForm';
//import NewInvoicePreview from '../newInvoicePreview/newInvoicePreview';
import style from './loginPage.css';
import formStyle from '../../commonStyles/form.css';

export default class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            emailValid: true,
            pass:'',
            renderFailNotif:false,
            renderSuccessNotif:false,
            notif:''
        };
        this.changeMail = this.changeMail.bind(this);
        this.changePass = this.changePass.bind(this);
        this.submitData = this.submitData.bind(this);
        this.isEmail = this.isEmail.bind(this);
        this.formValidated = this.formValidated.bind(this);
        this.maybeRenderNotif = this.maybeRenderNotif.bind(this);
    }

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

    changeName(e){
        this.setState({
            name: e.target.value
        });
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

    mapApiMessagesToNotif(msg){
        switch(msg) {
            case 0:
                this.setState({notif:"Email not found"});
                break;
            case 1:
                this.setState({notif:"Invalid Password"});
                break;
            case 2:
                this.setState({notif:"Error with database"});
                break;
            case 3:
                this.setState({notif:"The famous not found"});
                break;
            case 4:
                this.setState({notif:"Email already exists!"});
                break;
            case 5:
                this.setState({notif:"Can't create user"});
                break;
            case 6:
                this.setState({notif:"Password reset expired :-("});
                break;
            case 7:
                this.setState({notif:"Password reset failed"});
                break;
            case 8:
                this.setState({notif:"Password rest email incorrect"});
                break;
            case 9:
                this.setState({notif:"Can't reset password"});
                break;
            case 10:
                this.setState({notif:"Please enter the same password to confirm"});
                break;
            default:
                this.setState({notif:''});
        }
    }

    submitData(){
        if (this.formValidated()) {
            axios.post('/api/account/login', {
                email: this.state.email,
                password: this.state.pass
            })
                .then((response) => {//use arrow function to avoid binding 'this' manually, see https://www.reddit.com/r/javascript/comments/4t6pd9/clean_way_to_setstate_within_axios_promise_in/
                    // console.log("success!",response);
                    if (response.data.success) {
                        console.log(response.data.extras.userProfileModel);
                        this.setState({
                            renderSuccessNotif: true,
                            renderFailNotif: false
                        });
                    } else {
                        this.setState({
                            renderSuccessNotif: false,
                            renderFailNotif: true
                        });
                        this.mapApiMessagesToNotif(response.data.extras.msg);
                    }
                })
                .catch((error)=> {
                    console.log("error!",error);
                });
        } else {
            console.debug("The login is not correct");
        }
    }

    maybeRenderNotif(){
        if (this.state.renderFailNotif) {
            return(
                <div>{this.state.notif}</div>
            );
        } else if (this.state.renderSuccessNotif) {
            return(
                <div>User {this.state.name} Login!</div>
            );
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
                        type="text"
                        value={this.state.pass}
                        placeholder="your password"
                        onChange={this.changePass}
                    />
                </div>
                <button onClick = {this.submitData}>submit!</button>
                {this.maybeRenderNotif()}
            </div>
        );
    }
}