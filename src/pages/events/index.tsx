import PostTable from "@/components/channels/posts/PostTable";
import CustomTable from "@/components/customs/CustomTable";
import { Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import { EventTableColumns } from "@/data/headers/Events";
import EventTableRow from "@/components/events/EventTableRow";

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

export default function Events(props: any) {
    const [value, setValue] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchChannels();
    }, [])

    async function fetchChannels() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setEvents(json)
        }
    }

    const onChange = (params: any) => {
        // when date button is clicked
        console.log("on change")
        console.log(params)
        setValue(value);
    }

    const changeView = (params: any) => {
        console.log("changeView")
        console.log(params)
    }

    const onActiveStartDateChange = (params: any) => {
        console.log("onActiveStartDateChange");
        console.log(params);
        console.log(value);
        setValue(params.activeStartDate);

    }

    const EventTableOptions = {
        filter: true,
        onFilterChange: (changedColumn: any, filterList: any) => {
        },
        selectableRows: "none",
        filterType: "dropdown",
        responsive: "simple",
        expandableRows: true,
        tableId: "Events",
        pagination: false,
        elevation: 0,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            console.log(rowData, rowMeta);
            return (
                <EventTableRow rowData={rowData} updateHandler={updateHandler} />
            );
        }
    };

    function updateHandler(params: any) {
        const modEvents = events.map(e => e.id === params.id ? params : e);
        setEvents(modEvents);
    }

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xs={4}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <Grid container
                        alignItems="center"
                        justifyContent="center">
                        <Calendar
                            locale="en-EN"
                            onChange={onChange}
                            value={value}
                            onViewChange={changeView}
                            onActiveStartDateChange={onActiveStartDateChange}
                            tileClassName={({ activeStartDate, date, view }) => {
                                if (events.find(x => new Date(x.startDate).toDateString() >= new Date(date).toDateString("DD-MM-YYYY") 
                                && new Date(x.endDate).toDateString() <= new Date(date).toDateString("DD-MM-YYYY"))) {
                                    return 'highlight'
                                }
                            }} />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {events.length !== 0 ?
                        <PostTable data={events.filter(post => {
                            return value <= new Date(post.endDate) && getFirstDayOfMonth(value.getFullYear(), value.getMonth() + 1) > new Date(post.endDate)
                        }
                        )} columns={EventTableColumns} options={EventTableOptions} />
                        : <React.Fragment />}
                </Paper>
            </Grid>
        </Grid>);
}