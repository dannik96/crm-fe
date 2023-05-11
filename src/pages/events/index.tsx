import PostTable from "@/components/channels/posts/PostTable";
import CustomTable from "@/components/customs/CustomTable";
import { Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import { EventTableColumns, EventTableData, EventTableOptions } from "@/data/headers/Events";

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

export default function Events(props: any) {
    const [value, setValue] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [posts, setPosts] = useState([]);

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
            setPosts(json)
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
                                if (posts.find(x => new Date(x.startDate).toDateString() >= new Date(date).toDateString("DD-MM-YYYY") 
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
                    {posts.length !== 0 ?
                        <PostTable data={posts.filter(post => {
                            return value <= new Date(post.endDate) && getFirstDayOfMonth(value.getFullYear(), value.getMonth() + 1) > new Date(post.endDate)
                        }
                        )} columns={EventTableColumns} options={EventTableOptions} />
                        : <React.Fragment />}
                </Paper>
            </Grid>
        </Grid>);
}