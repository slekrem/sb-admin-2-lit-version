import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
} from 'redux';

import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    state => state,
    devCompose(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk)
    )
);

import app from './reducers/appReducer';
import profile from './reducers/profileReducer';

store.addReducers({ app, profile });