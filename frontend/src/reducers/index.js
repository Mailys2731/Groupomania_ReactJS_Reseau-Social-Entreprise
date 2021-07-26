import LoggerReducer from './isLogged';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: LoggerReducer
});

export default allReducers