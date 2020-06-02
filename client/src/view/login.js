import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import { loginService } from '../services/service-calls.js';
// import { LOGIN_AUTH1_URL, LOGIN_AUTH2_URL } from "./utils/constants.js";
import { setTokens, getItem } from '../utils/localStorage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: (getItem('ID_TOKEN') && getItem('EXPIRE') && Number(getItem('EXPIRE')) * 1000 > Date.now()) ? true : false,
            showSuccessMsg: false, showFailedMsg: false, username: ""
        };
        // this.btnloginReset = this.btnloginReset.bind(this);
    }

    nameInputChange = () => {
        setTimeout(this.validateName, 1);
    };

    passwordInputChange = () => {
        setTimeout(this.validatePassword, 1);
    };

    onInputKeyPress = (event) => {
        if (event.charCode == 13)
            this.validateCredentials();
    };

    validateCredentials = () => {
        if (this.state.showFailedMsg)
            this.setState({ showFailedMsg: false });

        let isNameValid = this.validateName();
        let isPasswordValid = this.validatePassword();

        if (!!isNameValid && !!isPasswordValid) {
            this.loginButton.style.display = "none";
            this.loggingButton.style.display = "block";
            console.log('validated');
            this.doLoginStep();
        }
    };

    validateName = () => {
        let valid = this.nameInput.value;
        if (valid && this.nameInput.classList.contains("error_form")) {
            this.nameInput.classList.remove("error_form");
            this.errorMsgUsername.style.display = "none";
        }
        else if (!valid && !this.nameInput.classList.contains("error_form")) {
            this.nameInput.classList.add("error_form");
            this.errorMsgUsername.style.display = "block";
        }
        return valid;
    };

    validatePassword = () => {
        let valid = this.passwordInput.value;
        if (valid && this.passwordInput.classList.contains("error_form")) {
            this.passwordInput.classList.remove("error_form");
            this.errorMsgPwd.style.display = "none";
        }
        else if (!valid && !this.passwordInput.classList.contains("error_form")) {
            this.passwordInput.classList.add("error_form");
            this.errorMsgPwd.style.display = "block";
        }
        return valid;
    };

    doLoginStep = () => {
        let data = {
            username: String(this.nameInput.value).trim(),
            password: String(this.passwordInput.value).trim(),

        };

        loginService(data, this.onLogin, this.loginError);
    };


    onLogin = (result) => {
        if (!(result.result && String(result.result) == "true")) {
            this.loginError(null);
            return;
        }

        setTokens(result);

        this.setState({ showSuccessMsg: true, username: String(this.nameInput.value).trim() });

        this.btnloginReset(true);

        setTimeout(() => {
            this.setState({ success: true });
        }, 3000);
    };

    loginError = (error) => {
        this.setState({ showFailedMsg: true });
        this.btnloginReset();
    };

    btnloginReset = (disableLogin) => {
        this.loginButton.style.display = "block";
        if (disableLogin) {
            this.loginButton.disabled = disableLogin;
        } else {
            this.loginButton.disabled = false;
        }
        this.loggingButton.style.display = "none";
    };

    render() {
        if (this.state.success) {
            return <Redirect from="/" to="/app/dashboard" />;
        }

        let { showFailedMsg, showSuccessMsg, username } = this.state;

        return (
            <section class="login-page login-bg">
                <div>
                    <div class="lang-sel m-a hidden-xs">
                        <select class="custom-select custom-select-sm">
                            <option value="en" selected="selected">English</option>
                            <option value="es">Castellano</option>
                            <option value="ca">Català</option>
                            <option value="fr">Français</option>
                            <option value="pt">Português</option>
                        </select>
                    </div>
                    <div class="content-center container">
                        <div class="row">
                            <div class="col-lg-6 col-md-12">
                                <div class="company_detail">

                                    <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
                                    <p>Lorem Ipsum is simply rummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy </p>
                                    <div class="footer">
                                        <ul>
                                            <li><a href="#" target="_blank">Contact Us</a></li>
                                            <li><a href="#" target="_blank">About Us</a></li>
                                            <li><a href="#" target="_blank">Services</a></li>
                                            <li><a href="#">FAQ</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 ">
                                <div class="card-plain">
                                    <div class="heading">
                                        <h2>Login</h2>
                                    </div>
                                    <form class="form login_form">
                                        <div class="form-group">
                                            <input type="text" class="form-control text-box" placeholder="Username" ref={nameInput => this.nameInput = nameInput}
                                                onInput={this.nameInputChange} onKeyPress={this.onInputKeyPress} autoFocus />
                                            <div class="error_msg_login">
                                                <p ref={errorMsgUsername => this.errorMsgUsername = errorMsgUsername} class="error_msg error_msg_un">Username is required</p>
                                            </div>
                                        </div>
                                        <div class="form-group password-block">
                                            <input type="password" placeholder="Password" class="form-control text-box" ref={passwordInput => this.passwordInput = passwordInput}
                                                onInput={this.passwordInputChange} onKeyPress={this.onInputKeyPress} />
                                            <a class="forgot" href="/a/reset_password" target="_blank" tabindex="6">Forgot?</a>
                                            <div class="error_msg_login">
                                                <p ref={errorMsgPwd => this.errorMsgPwd = errorMsgPwd} class="error_msg error_msg_pw">Password is required</p>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="card-plain-footer">
                                        <button type="button" class="login-button" ref={loginButton => this.loginButton = loginButton} onClick={this.validateCredentials}> Login</button>
                                        <button type="button" ref={loggingButton => this.loggingButton = loggingButton} class="logging_button"><i class="fa fa-spinner fa-spin hidden"></i> Logging in...</button>
                                        <div id="login_status_msg_div">
                                            <p class={showFailedMsg ? "login_failed_msg" : "success_msg"}>
                                                {showSuccessMsg && <span><span class="icon-ans-calls" style={{ paddingRight: "5px" }}></span>{"Welcome " + username + "! We are redirecting you"}</span>}
                                                {showFailedMsg && <span>Invalid username and/or password</span>}
                                            </p>
                                        </div>
                                        <div class="footer-link">
                                            <p>Not a client yet? <a href="#">Contact us now</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;