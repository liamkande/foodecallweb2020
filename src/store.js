import { createStore, combineReducers } from 'redux';

import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});
const store = createStore(reducers)

export default store;


