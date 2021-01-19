import React, { Component } from 'react';
import './reminder-status-filter.css';
//import { Button } from 'reactstrap';

export default class ReminderStatusFilter extends Component{
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'All reminders'},
            /*{name: 'like', label: 'Liked reminders'},*/
            {name: 'important', label: 'important'},
            {name: 'active', label: 'active'},
            {name: 'expired', label: 'expired'}
        ]
    }

    render() {
        
        const buttons = this.buttons.map( ({name, label}) => {
            const {filter, onFilter} = this.props;
            const active = filter === name;
            const status = active ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button 
                    key = {name} 
                    type = 'button' 
                    className = {`btn ${status}`}
                    onClick={()=> onFilter(name)}
                >
                {label}</button>
            )
        });

        return (
            <div className='btn-group'>
               {buttons}
            </div>
        )
    }
}