import { createStore, applyMiddleware } from 'redux';
import waiter from 'redux-waiters';
import reducer from '../reducers';

const middlewares = [waiter];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));

export default store;

