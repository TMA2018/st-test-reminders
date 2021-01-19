import React, {Component} from 'react';
import Timer from './timer';

import './reminder-list-item.css';

export default class ReminderListItem extends Component {
    
    // state = {
    //      expired: false
    // }
    
    getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    render() {
        const {label, deadline, onDelete, onToggleImportant, important, expired, onChangeActive, onChangeRemind} = this.props;
        //let {expired} = this.state;
        let classNames = 'app-list-item d-flex justify-content-between';
        //const timer = new Timer({label},deadline);
        //console.log(deadline);

        let dd = new Date (deadline);
        let now = new Date();
        
        let h,m,s,y,mt,d;
        
        h = this.getZero(+dd.getHours());
        m = this.getZero(+dd.getMinutes());
        s = this.getZero(+dd.getSeconds());
        y = this.getZero(+dd.getFullYear());

        mt = this.getZero(+dd.getMonth() + 1);
        d = this.getZero(+dd.getDate());

        let date = `${d}.${mt}.${y}`;

        let time = ` ${h}:${m}:${s}`;
        //date = `${date} ${h}:${m}:${s}`;

        // let timerId = setInterval( () => { 
        //     expired = this.viewExpired(now, dd) 
        // }, 1000);

        //console.log(dd);
        //console.log(time);
        //onChangeActive;

        if (dd > now) {
            this.timerId = setTimeout(onChangeActive, dd - now);
        } else {
            clearTimeout(this.timerId);
            this.timerId = setTimeout(onChangeActive, 0);
            clearTimeout(this.timerId);
        }
        
            
        if (important) {
            classNames += ' important';
        }
        if (expired) {
            classNames += ' expired';
        }
        return (
            <div className={classNames}>
                <span 
                    className='app-list-item-label'
                    onClick={onToggleImportant}>
                    {label}
                </span>
                <span 
                    className='app-list-item-label'
                    //onClick={onToggleImportant}
                    >
                    {date}
                    {time}
                    {/*{deadline}*/}
                </span>

                <div className='d-flex justify-content-center align-items-center'>
                    <button 
                        type='button' 
                        className='btn-sm btn-pencil-o'
                        onClick={onChangeRemind}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button 
                        type='button' 
                        className='btn-star btn-sm'
                        onClick={onToggleImportant}>
                        <i className='fa fa-star'></i>
                    </button>
                    <button 
                        type='button' 
                        className='btn-sm btn-trash-o'
                        onClick={onDelete}>
                        <i className='fa fa-trash'></i>
                    </button>
                </div>
            </div>
        )
    }
}