import PostTable from "@/components/channels/posts/PostTable";
import CustomTable from "@/components/customs/CustomTable";
import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import { EventTableColumns } from "@/data/headers/Events";
import EventTableRow from "@/components/events/EventTableRow";
import AddEventDialog from "@/components/customs/AddEventDialog";
import { create } from "domain";
import { useRouter } from "next/router";
import { getData } from "@/util/communicationUtil";

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

export default function Events(props: any) {
    const [value, setValue] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        getData(setEvents, router, "/api/event/");

    }, [])

    const onChange = (params: any) => {
        // when date button is clicked
        setValue(value);
    }

    const onActiveStartDateChange = (params: any) => {
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
            return (
                <EventTableRow rowData={rowData} updateHandler={updateHandler} deleteData={deleteData} />
            );
        }
    };

    function updateHandler(params: any) {
        const modEvents = events.map(e => e.id === params.id ? params : e);
        setEvents(modEvents);
    }

    async function deleteData(param: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/` + param.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const modEvents = events.filter(ev => ev.id !== param.id);
            setEvents(modEvents)
        }
    }

    async function createEvent(param: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(param)
        })

        if (res.ok) {
            const modEvents = await res.json();
            console.log(modEvents);
            setEvents([...events, modEvents])
        }
        setOpen(false)
    }

    function compareDates(x: never, date: Date): unknown {
        const startDate = new Date(x.startDate);
        startDate.setHours(0,0,0,0);
        const endDate = new Date(x.endDate);
        endDate.setHours(0,0,0,0);

        return startDate.getTime() <= date.getTime() && date.getTime() <= endDate.getTime();
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
                            onActiveStartDateChange={onActiveStartDateChange}
                            tileClassName={({ activeStartDate, date, view }) => {
                                if (events.find(x => compareDates(x, date))) {
                                    return 'highlight';
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
                    <Button variant="contained" onClick={() => setOpen(true)}>Add new</Button>
                    {<AddEventDialog onClose={() => setOpen(false)} open={open} onSave={createEvent} />}

                    <PostTable data={events.filter(post => {
                        return value <= new Date(post.endDate) && getFirstDayOfMonth(value.getFullYear(), value.getMonth() + 1) > new Date(post.endDate)
                    }
                    )} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
        </Grid>);
}