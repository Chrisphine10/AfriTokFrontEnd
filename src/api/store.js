//react redux store
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';

//const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStore(reducers, {});

export default store;