import { combineReducers } from 'redux';
import currencyList from './CurrencyAction';
import usersList from './UserListRedusers';

const allReducer = combineReducers({
    currencyList: currencyList,
    usersList: usersList
});

export default allReducer;