import React from "react";
import { Calendar } from "react-material-event-calendar";


export default function Posts(props: any) {
    const getSelectedDays = (days: any) => {
        console.log(days)
    }
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return (
        <React.Fragment>
            <Calendar month={currentMonth} title="Calendar" selectColor={'red'} getSelectedDays={getSelectedDays} year={currentYear} selectedDays={{ '2020-5': [{ '3': { 'info': 'testing', color: 'red' } }, { '8': { 'info': 'testing2' } }] }} />
        </React.Fragment>);
}