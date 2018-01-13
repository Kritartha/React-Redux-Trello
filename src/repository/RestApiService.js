import {BASE_URL} from '../constant'

export const getEvents = async() => {
    const response = await fetch(`${BASE_URL}/events`)
    return response.json()
}

export const createEvent = async(text, status) => {
    return await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text, isComplete: false, status: status})
    }).then(res => res.json())
}

export const updateEvent = async(event) => {
    return await fetch(`${BASE_URL}/${event.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(res => res.json())
}

export const destroyEvent = async(id) => {
    return await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}