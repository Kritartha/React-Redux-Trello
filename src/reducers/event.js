import {CURRENT_UPDATE, EVENT_ADD, EVENT_LOAD, EVENT_DELETE, UPDATE_EVENTS} from '../constant'

const initState = {
    events: [],
    currentEvent: ''
}

export default (state = initState, action) => {
    switch(action.type) {
        case UPDATE_EVENTS:
            return {...state, events: action.payload}

        case EVENT_LOAD:
            return {...state, events: action.payload}

        case CURRENT_UPDATE:
            return {...state, currentEvent: action.payload}
        
        case EVENT_ADD:
            return {...state, 
                    currentEvent: '', events: state.events.concat(action.payload)}

        case EVENT_DELETE:
            return {...state, 
                    events: state.events.filter(event => event.id !== action.payload)}

        default:
            return state;
    }
}