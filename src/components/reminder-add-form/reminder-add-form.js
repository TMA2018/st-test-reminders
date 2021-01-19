import React, { Component } from 'react';
import './reminder-add-form.css';

export default class ReminderAddForm extends Component {

    state = {
        reminder: '',
        deadlineDate: '',
        deadlineTime: ''
    }

    onValueChange = (evt) => {
        this.setState( {
            reminder: evt.target.value
        });
    }
    onDateChange = (evt) => {
        this.setState( {
            deadlineDate: evt.target.value
        });
    }
    onTimeChange = (evt) => {
        this.setState( {
            deadlineTime: evt.target.value
        });
    }
    onSubmit = (evt) => {
        let r = this.state.reminder.length;
        let d = this.state.deadlineDate.length;
        let t = this.state.deadlineTime.length;
        evt.preventDefault();
        if ( r === 0 || d === 0 || t === 0 ) {
            alert('write correct data');
        } else {
            this.props.onAdd(this.state.reminder, this.state.deadlineDate, this.state.deadlineTime);
        }
        //this.props.onAdd();
        this.setState({
            reminder: '',
            deadlineDate: '',
            deadlineTime: ''
        })
    }

    render () {
        return (
            <form 
                className='bottom-panel d-flex'
                onSubmit={this.onSubmit}>
                <input
                    type='text'
                    placeholder='What do you want to do??'
                    className='form-control new-reminder-label'
                    onChange={this.onValueChange}
                    value={this.state.reminder}
                />
                <input
                    type='date'
                    className='form-control new-reminder-label'
                    onChange={this.onDateChange}
                    value={this.state.deadlineDate}
                />
                <input
                    type='time'
                    className='form-control new-reminder-label'
                    onChange={this.onTimeChange}
                    value={this.state.deadlineTime}
                />
                <button
                    type='submit'
                    className='btn btn-online-secondary'
                    //onClick={() => onAdd('Hello')}
                >create reminder</button>
            </form>
        )
    }
}