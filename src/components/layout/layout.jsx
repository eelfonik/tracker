import React from 'react';
import { Link } from 'react-router';
import style from './layout.css';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
import '!style!css!../../commonStyles/reset.css';
import '!style!css!../../commonStyles/font.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div className={style.appContainer}>
                <header className={style.header}>
                    <Link to="/">
                        <img className={style.logo} src="/img/node.svg"/>
                    </Link>
                    <Link className={style.signupLink} to="/signup">sign up</Link>
                </header>
                <div className={style.appContent}>{this.props.children}</div>
                <footer className={style.footer}>
                    <p>
                        <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
                    </p>
                </footer>
            </div>
        );
    }
}