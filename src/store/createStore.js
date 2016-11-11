import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import rootReducer from '../reducers';
import newCommandResolverMiddleware from '../middlewares/NewCommandResolverMiddleware';
import validCommandMiddleware from '../middlewares/ValidCommandMiddleware';
import lastStepMiddleware from '../middlewares/LastStepMiddleware';
import tooFewTasksMiddleware from '../middlewares/TooFewTasksMiddleware';
import { updateLocation } from './location';

export default () => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk,
    newCommandResolverMiddleware,
    validCommandMiddleware,
    lastStepMiddleware,
    tooFewTasksMiddleware];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    undefined,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
