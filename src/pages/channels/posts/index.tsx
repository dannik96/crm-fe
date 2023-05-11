import PostTable from "@/components/channels/posts/PostTable";
import CustomTable from "@/components/customs/CustomTable";
import { Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { PostTableColumns, PostTableOptions } from "@/data/headers/Posts";


function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

export default function Posts(props: any) {
    const [value, setValue] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchChannels();
    }, [])

    async function fetchChannels() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/`, {
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
                                if (posts.find(x => new Date(x.postDate).toDateString() === new Date(date).toDateString())) {
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
                    {posts.length !== 0 ? <PostTable data={posts.filter(post => {
                        return value <= new Date(post.postDate) && getFirstDayOfMonth(value.getFullYear(), value.getMonth() + 1) > new Date(post.postDate)
                        }
                    )} columns={PostTableColumns} options={PostTableOptions} /> : <React.Fragment />}
                </Paper>
            </Grid>
        </Grid>);
}