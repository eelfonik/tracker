import React from 'react';
import { render } from 'react-dom';
//import AthletePreview from './AthletePreview';
//import athletes from '../data/athletes';
import style from './indexPage.css';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="home">
                <div className={style.header}>
                    this is the index!
                </div>
            </div>
        );
    }
}