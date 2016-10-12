import React from 'react';
import { render } from 'react-dom';
import NewInvoiceForm from '../newInvoiceForm/newInvoiceForm';
//import AthletePreview from './AthletePreview';
//import athletes from '../data/athletes';
import style from './indexPage.css';

export default class IndexPage extends React.Component {
    render() {
        //console.debug(this.props);
        return (
            <div className="home">
                <div className={style.header}>
                    Feed me a new invoice!
                </div>
                <NewInvoiceForm/>
            </div>
        );
    }
}