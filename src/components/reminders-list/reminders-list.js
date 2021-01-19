import React, {Component} from 'react';
import ReminderListItem  from '../reminder-list-item/reminder-list-item';
import { ListGroup } from 'reactstrap';
import Spinner from '../spinner/spinner';

import './reminders-list.css';

export default class RemindersList extends Component {
    //let timerId;
    render() {
        const {reminders, loading, onDelete, onToggleImportant, onChangeActive,onChangeRemind} = this.props;
        if (loading) {
            return <Spinner/>
        }
        
        const elems = reminders.map((item) => {
            const {id, ...itemProps} = item;

            return (
                <li key={id} className='list-group-item'>
                    <ReminderListItem 
                        {...itemProps} 
                        onDelete={() => onDelete(id)}
                        onToggleImportant={() => onToggleImportant(id)}
                        onChangeActive={() => onChangeActive(id,item.deadline)}
                        onChangeRemind={() => onChangeRemind(id)}
                        //onChangeActive(id,item.deadline)
                    />
                </li>
            )
            
        });
        //clearTimeout(timerId);
        return (
            <ListGroup className='app-list'>
                {elems}
            </ListGroup>
        )
    }
}