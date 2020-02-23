import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.scss'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { reducer as reduxFormReducer } from 'redux-form'
import mainReducer from './reducers'
import * as serviceWorker from './serviceWorker'

const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form"
    mainReducer
  })

const middleware = applyMiddleware(thunkMiddleware, logger)
const store = createStore(reducer, middleware)


ReactDOM.render
(<Provider store={store}>
    <App />
 </Provider>,
 document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
