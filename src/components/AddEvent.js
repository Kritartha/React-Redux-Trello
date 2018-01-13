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
                <form className="form-inline d-flex justify-content-center" onSubmit={this.handleSubmit}>
                    <input  className="form-control mb-2 mr-sm-2 mb-sm-0"
                            type="text"
                            onChange={this.handleInputChange} 
                            value={currentEvent}/>

                    <button className="btn btn-primary" 
                        type="submit"
                        onClick={this.handleAddEvent}>Add</button>
                </form>
            </div>
        )
    }
}

export default connect(
    (state) => ({currentEvent: state.event.currentEvent}),
    {updateCurrent, saveEvent}
)(AddEvent)

