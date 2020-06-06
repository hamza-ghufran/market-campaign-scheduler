import campaign from "reducers/campaign";
import scenario from "reducers/scenario";

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";

const appReducer = combineReducers({
  campaign,
  scenario
});

const rootReducer = (state, action) => {

  return appReducer(state, action);
};

const initialState = {};

const logger = createLogger({});

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  return store;
}
