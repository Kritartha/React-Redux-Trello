import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import eventReducer from './reducers/event'
import messageReducer from './reducers/message'

const reducer = combineReducers({
    event: eventReducer,
    message: messageReducer
});

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)