import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ReminderStatusFilter from '../reminder-status-filter/reminder-status-filter';
import RemindersList from '../reminders-list/reminders-list';
import ReminderAddForm from '../reminder-add-form/reminder-add-form';
import Service from '../service/service';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

export default class App extends Component {
    constructor(){
        super();
        this.maxId = 6;
        this.urldb = "http://localhost:3000/reminders";
    }
    makeReminde = (label, deadline, important, id) => {
        return {
            label: label,
            deadline: deadline,
            important: Boolean(important),
            id: id,
            expired: (new Date () > new Date (deadline)),
            active: !(new Date () > new Date (deadline))
          // ...другие свойства
        };
    }

    service = new Service();

    state = {
        data: [
            /*{label: 'going to learn React', deadline: '2021-01-03T12:08:30', expired: (new Date () < new Date (this.deadline)), active: !this.expired, important: this.expired,  id: 'krww'},
            {label: 'step 2', deadline: '2020-12-30T10:00:00', expired: (new Date () < new Date (this.deadline)), active: !this.expired, important: false, id: 'gwgw'},
            {label: 'i have a vacation', deadline: '2020-12-29T21:38:00', expired:(new Date () < new Date (this.deadline)), active: !this.expired, important: false, id: 'afafa'},
            {label: 'I need a help', deadline: '2020-12-29T19:22:40', expired: (new Date () < new Date (this.deadline)), active: !this.expired, important: false, id: 'aggwr'},
            {label: 'I need a break', deadline: '2020-12-28T10:00:00', expired: (new Date () < new Date (this.deadline)), active: !this.expired, important: false, id: 'gegc'}*/
            /*this.makeReminde('going to learn React','2021-01-05T16:00:20',false,'krww'),
            this.makeReminde('step 2','2020-12-30T10:00:00',false,'gwgw'),
            this.makeReminde('i have a vacation','2020-12-29T21:38:00',false,'afafa'),
            this.makeReminde('I need a help','2021-01-05T16:03:30',false,'aggwr'),
            this.makeReminde('I need a break','2020-12-28T10:00:00',false,'gegc')*/
        ],
        term: '',
        filter: 'all',
        loading: true
    }


    initialState() {
         //console.log(this.service.getReminders())
         //console.log(this.service.getReminders().then());
        this.service.getReminders(this.urldb)
            .then( 
                //console.log('get resources ok')
                (reminders) => {
                    const newData = [];
                    this.setState( () => {
                        
                        reminders.forEach( ({label, deadline, important, id}) => {
                            newData.push(this.makeReminde(label, deadline, important, id));
                            //alert(reminder.important);
                        });
                        return {
                            data: newData,
                            loading: false
                        }
                    });
                }
            ).catch(console.log(`Failed to send resource`));
    }
    componentDidMount() {
        this.initialState();
    }

    deleteReminders = (id) => {
        //console.log(id);
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            /*data.splice(index, 1);
            return {
                data: data
            }*/
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newData = [...before, ...after];
            return {
                data: newData
            }
        });
    }

    addReminders = (label, deadlineDate, deadlineTime) => {
        //console.log(id);
        let deadline = `${deadlineDate}T${deadlineTime}`;

        /*let dd = new Date (deadline);
        let now = new Date();
        const newReminder = {
            label: label,
            deadline: deadline,
            expired: (dd < now), 
            active: !(dd < now),
            id: this.maxId++
        }*/
        const newReminder = this.makeReminde(label, deadline, false, this.maxId++);
        this.service.setReminder(this.urldb, newReminder)
            .then(console.log('posting successful'))
            .catch(console.log(`posting to ${this.urldb} failure`));

        this.setState(({data}) => {
            const newData = [...data, newReminder];
            return {
                data: newData
            }
        });
        //this.initialState();
    }

    onToggleProps(id, prop) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            let newData = [];
            if (prop ==='important') {
                const newItem = {...old, important: !old.important}
                newData= [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            } 
            return {
                data: newData
            }
        });
    }

    onToggleImportant = (id) => {
        this.onToggleProps(id, 'important');
        //alert(`'exp' ${this.state.data[0].expired}, 'act' ${this.state.data[0].active}, 'imp' ${this.state.data[0].important}`);
    }

    searchReminders(reminders, term) {
        if (term.length === 0) {
            return reminders
        }
        return reminders.filter((reminder) => {
            return reminder.label.indexOf(term) > -1
        });

    }
    filterReminders(reminders, filter) {
        /*if (filter === 'expired') {
            return reminders.filter(reminder => reminder.expired)
        } else if (filter === 'active') {
            return reminders.filter(reminder => reminder.active)
        } else if (filter === 'important') {
            return reminders.filter(reminder => reminder.important)
        } else{
            return reminders
        };*/
        switch (filter) {
            case 'expired': return reminders.filter(reminder => reminder.expired);
            case 'active': return reminders.filter(reminder => reminder.active);
            case 'important': return reminders.filter(reminder => reminder.important);
            default: return reminders;
        };
    }
    
    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilter = (filter) => {
        this.setState({filter});
    }
    onChangeRemind = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            let newData = [];
            
            let newLabel = prompt('change label', old.label) || old.label;
            let newDeadline = prompt('change deadline', old.deadline) || old.deadline;

            let dd = new Date (newDeadline);
            let now = new Date();

            if (dd > now) {
                const newItem = {...old, label: newLabel, deadline: newDeadline, expired: false, active: true}
                newData= [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            } else {
                const newItem = {...old, label: newLabel, deadline: newDeadline, expired: true, active: false}
                newData= [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            }            
            //console.log(newData);
            return {
                data: newData
            }
        })
    }

    onChangeActive = (id, deadline) => {
        let dd = new Date (deadline);
        let now = new Date();
        let k=0;
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            let newData = [];
            if (dd > now) {
                const newItem = {...old, expired: false, active: true}
                newData= [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            } else {
                const newItem = {...old, expired: true, active: false}
                newData= [...data.slice(0, index), newItem, ...data.slice(index + 1)];                
                if ( k===0 ) alert(`You need "${old.label}" done. thank`);
                k=1;
            }            
            //console.log(newData);
            return {
                data: newData
            }
        });
    }

    render() {
        const {data, term, filter, loading} = this.state;
        const expired = data.filter(item => item.expired).length; 
        const active = data.filter(item => item.active).length;
        const important = data.filter(item => item.important).length;
        const allReminders = data.length;
        const visibleReminders = this.filterReminders(this.searchReminders(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    expired = {expired}
                    active = {active}
                    allReminders={allReminders}
                    important={important}
                />
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <ReminderStatusFilter
                        filter={filter}
                        onFilter={this.onFilter}
                    />
                </div>
                <RemindersList 
                    reminders = {visibleReminders}
                    loading = {loading}
                    onDelete = {this.deleteReminders}
                    onToggleImportant = {this.onToggleImportant}
                    onChangeActive = {this.onChangeActive}
                    onChangeRemind = {this.onChangeRemind}
                />
                <ReminderAddForm
                    onAdd={this.addReminders}
                />
            </AppBlock>
        )
    }
}
