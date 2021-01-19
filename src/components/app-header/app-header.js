import React from 'react';
import './app-header.css';
import styled from 'styled-components';
const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        color: ${props => props.colored ? 'black' : 'red'};
        :hover {
            color: blue;
        }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`;


const AppHeader = ({allReminders, active, expired, important}) =>{
    return (
        <Header colored>
            <h1>Tala Mikhail</h1>
        <h2>You have {allReminders} reminders, active {active}, expired {expired}, important {important}</h2>
        </Header> 
    )
}

export default AppHeader;