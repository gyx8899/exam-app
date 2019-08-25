import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
import userMiddleware from '../middlewares/client/user';
import {persistReducer} from "redux-persist";
import localForage from 'localforage';

const isEnvDev = process.env.NODE_ENV !== 'production';
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer({
	key: 'root',
	storage: localForage
}, rootReducer);

const bindMiddleware = (middleware) => {
	// add route middleware
	middleware.push(userMiddleware);
	if (process.env.NODE_ENV !== 'production') {
		const {composeWithDevTools} = require('redux-devtools-extension');
		// development use logger
		const {logger} = require('redux-logger');
		middleware.push(logger);
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
	const store = createStore(
			persistedReducer,
			initialState,
			bindMiddleware([sagaMiddleware])
	);

	store.runSagaTask = () => {
		store.sagaTask = sagaMiddleware.run(rootSaga);
	};

	store.runSagaTask();

	// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
	if (isEnvDev && module.hot) {
		module.hot.accept('./reducers', () => {
			// eslint-disable-next-line global-require
			store.replaceReducer(require('./reducers').default);
		});
	}
	isEnvDev && console.log(`InitialState: ${JSON.stringify(store.getState(), null, 2)}`);

	return store;
}

export default configureStore;