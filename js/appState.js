import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import posts from 'wordpress-query-posts/lib/state';
import pages from 'wordpress-query-page/lib/state';
import menu from 'wordpress-query-menu/lib/state';

let reducer = combineReducers( { posts, pages, routing: routerReducer } );

let middleware = [ thunkMiddleware ];

let createStoreWithMiddleware = applyMiddleware.apply( null, middleware );

export function createReduxStore( initialState = {} ) {
	if (
		typeof window === 'object' &&
		window.devToolsExtension
	) {
		createStoreWithMiddleware = compose( createStoreWithMiddleware, window.devToolsExtension() );
	}
	return createStoreWithMiddleware( createStore )( reducer, initialState );
}
