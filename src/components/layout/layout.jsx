import React from 'react';
import { Link } from 'react-router';
import style from './layout.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/">
                        <img className={style.logo} src="/img/node.svg"/>
                    </Link>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer className={style.footer}>
                    <p>
                        <a href="http://mern.io/" target="_blank" rel="noopener noreferrer">MERN</a> build by hand.
                    </p>
                </footer>
            </div>
        );
    }
}