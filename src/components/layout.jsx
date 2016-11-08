//Global empty layout component just to hold all children components
//this could be a perfect place to gather all the state changes from the children,no?
//let's try

import React from 'react';

export default class Layout extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}