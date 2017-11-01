import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { browserHistory } from 'react-router';

import Home from './Home';

const Index = () => (
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={Home}/>
        </div>
    </Router>
);

export default Index;