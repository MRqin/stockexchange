import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import AppReducer from './AppReducer.js';

const reducer = combineReducers({
    "App": AppReducer,
});

export default reducer;