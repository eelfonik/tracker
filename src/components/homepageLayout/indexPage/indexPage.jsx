import React from 'react';
import { render } from 'react-dom';
//import AthletePreview from './AthletePreview';
//import athletes from '../data/athletes';
import indexPageStyle from './indexPage.css';

export default class IndexPage extends React.Component {
    render() {
        //console.debug(this.props);
        return (
            <div className="home">
                WELCOME!
            </div>
        );
    }
}