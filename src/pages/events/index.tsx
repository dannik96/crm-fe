import PostTable from "@/components/channels/posts/PostTable";
import CustomTable from "@/components/customs/CustomTable";
import { Box, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import { Posts } from "@/data/headers/Posts";
import { EventTableColumns, EventTableData, EventTableOptions } from "@/data/headers/Events";

const data = [{
    id: 1,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat lorem varius cursus feugiat. Aenean tincidunt velit at nibh dapibus, blandit dictum tortor ultrices. Nulla porttitor sem a ex imperdiet, quis volutpat odio malesuada. In fringilla ante posuere, euismod enim nec, consectetur risus. Maecenas gravida ipsum finibus porttitor faucibus. Ut consectetur nisi ac nulla lobortis, vitae vehicula leo ornare. Phasellus at varius justo, eget maximus mauris. Curabitur placerat tortor id iaculis scelerisque. Fusce facilisis at felis vel sollicitudin. Vivamus sapien libero, posuere sed egestas nec, imperdiet nec massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis tempus.",
    author: { id: 1, name: "user" },
    postDate: "25.4.2023"
}];

export default function Events(props: any) {
    const [value, setValue] = useState(new Date());
    console.log(new Date())
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

    const mark = [
        '04-04-2023',
        '08-04-2023',
        '15-04-2023'
    ]

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
                                if (mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
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
                    <PostTable data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
        </Grid>);
}