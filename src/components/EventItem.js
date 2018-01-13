import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'
import {DragSource, DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {deleteEvent} from '../actions/event'

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        }
    }
}

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if(dragIndex === hoverIndex)
            return

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        const hoverClientY = clientOffset.y -hoverBoundingRect.top

        // Dragging downwards
        if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
            return

        // Dragging upwards
        if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            return

        // Actual action
        props.moveCard(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex
    }
}

class EventItem extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
    }
    
    render() {
        const { id, 
                text, 
                deleteEvent, 
                isDragging, 
                connectDragSource, 
                connectDropTarget} = this.props
        
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(
            connectDropTarget(
                <ul style={{opacity: opacity}}>
                    <div className="w3-card event-card">
                        <span className="delete-item">
                            <button onClick={()=> deleteEvent(id)}>x</button>
                        </span>
                        <p>{text}</p>
                    </div>
                </ul>
            )
        )
    } 
}

EventItem = DropTarget('card', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))(EventItem)

EventItem = DragSource('card', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(EventItem)

export default connect(
    (state) => ({events: state.event.events}),
    {deleteEvent}
)(EventItem)