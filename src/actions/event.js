import {CURRENT_UPDATE, EVENT_LOAD, EVENT_ADD, EVENT_DELETE, EVENT_UPDATE, UPDATE_EVENTS} from '../constant'
import {createEvent, getEvents, destroyEvent} from '../repository/RestApiService'

export const updateCurrent = (val) => ({type: CURRENT_UPDATE, payload: val})
export const updateEvents = (events) => ({type: UPDATE_EVENTS, payload: events})
export const loadEvents = (events) => ({type: EVENT_LOAD, payload: events})
export const addEvent = (event) => ({type: EVENT_ADD, payload: event})
export const removeEvent = (id) => ({type: EVENT_DELETE, payload: id})
export const updateEvent = (event) => ({type: EVENT_UPDATE, payload: event})

export const saveEvent = (name, state) => {
    return (dispatch) => {
        createEvent(name, state)
            .then(res => dispatch(addEvent(res)))
    }
}

export const fetchEvents = () => {
    return (dispatch) => {
        getEvents()
            .then(events => dispatch(loadEvents(events)))
    }
}

export const deleteEvent = (id) => {
    return (dispatch) => {
        destroyEvent(id)
            .then(() => dispatch(removeEvent(id)))
    }
}