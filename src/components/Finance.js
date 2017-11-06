import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Nav from './Nav';

export default class Trade extends React.Component {
    render() {
        return(
            <div className="content content-trade">
                <Nav />
                <p> aaaaa </p>
            </div>
        );
    }
}
