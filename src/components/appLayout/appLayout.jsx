import React from 'react';
import { Link } from 'react-router';
import style from './appLayout.css';
// This imported styles globally without running through CSS Modules
// see https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
import '!style!css!../../commonStyles/reset.css';
import '!style!css!../../commonStyles/font.css';

export default class AppLayout extends React.Component {
    render() {
        return (
            <div className={style.appContainer}>
                <header className={style.header}>
                    <Link to="/">
                        <img className={style.logo} src="/img/node.svg"/>
                    </Link>
                    HELLO THERE
                    <Link className={style.signupLink} to="/login">Logout</Link>
                </header>
                <div className={style.appContent}>{this.props.children}</div>
                <footer className={style.footer}>

                </footer>
            </div>
        );
    }
}