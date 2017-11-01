import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/index.js';
import Index from './components/Index';
const store = createStore(appReducer);

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('app')
);