import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { browserHistory } from 'react-router';

import Home from './Home';
import Trade from './Trade';
import Finance from './Finance';
import TradeDetails from './TradeDetails';
const Index = () => (
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/trade" component={Trad} />
            <Route path="/finance" component={Finance} /> 
        </div>
    </Router>
);

const Trad = ({ match }) => (
    <div id= "trade">
        <Route exact path='/trade' component={Trade} />
        <Route path ='/trade/details' component={TradeDetails} />
    </div>
);

Trad.propTypes = {
    match: PropTypes.any,
};

export default Index;