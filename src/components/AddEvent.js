import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCurrent, saveEvent} from '../actions/event'

class AddEvent extends Component {
    handleInputChange = (event) => {
        const val = event.target.value
        this.props.updateCurrent(val)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.props.currentEvent.length > 0){
            this.props.saveEvent(this.props.currentEvent, 'in-progress')
        }
    }

    handleAddEvent = (event) => {
        event.preventDefault()
        if(this.props.currentEvent.length > 0){
            this.props.saveEvent(this.props.currentEvent, 'in-progress')
        }
    }

    render() {
        const {currentEvent} = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input  type="text"
                            onChange={this.handleInputChange} 
                            value={currentEvent}/>
                </form>
                <button className="btn-event-add" 
                        onClick={this.handleAddEvent}>Add</button>
            </div>
        )
    }
}

export default connect(
    (state) => ({currentEvent: state.event.currentEvent}),
    {updateCurrent, saveEvent}
)(AddEvent)

