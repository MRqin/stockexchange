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
const Index = () => (
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/trade" component={Trade} />
            <Route path="/finance" component={Finance} />
        </div>
    </Router>
);

export default Index;