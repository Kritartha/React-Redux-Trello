import React, {Component} from 'react'
import {connect} from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {fetchEvents, updateEvents} from '../actions/event'
import AddEvent from './AddEvent'
import EventItem from './EventItem'

class List extends Component {
    constructor(props) {
        super(props)
        this.moveCard = this.moveCard.bind(this)
    }

    componentDidMount() {
        this.props.fetchEvents();
    }

    moveCard(dragIndex, hoverIndex) {
        const {events} = this.props;
        var eventsClone = events.slice(0)
        const draggingEvent = eventsClone[dragIndex]
        
        eventsClone.splice(dragIndex, 1);
        eventsClone.splice(hoverIndex, 0, draggingEvent)

        this.props.updateEvents(eventsClone)
    }

    render() {
        return(
            <div className="Board-List d-flex align-items-center flex-column">
                <AddEvent />
                {this.props.events.map((event, i) => 
                    <EventItem 
                        key={event.id}
                        index={i}
                        id={event.id}
                        moveCard={this.moveCard}
                        deleteEvent={this.props.deleteEvent}
                        {...event}/>)}
            </div>
        )
    }
}

List = DragDropContext(HTML5Backend)(List)
export default connect(
    (state) => ({events: state.event.events}),
    {fetchEvents, updateEvents}
)(List)