import PostTable from "@/components/channels/posts/PostTable";
import CustomTable from "@/components/customs/CustomTable";
import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { PostTableColumns } from "@/data/headers/Posts";
import PostTableRow from "@/components/channels/posts/PostTableRow";
import AddPostDialog from "@/components/channels/posts/AddPostDialog";


function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
}

export default function Posts(props: any) {
    const [value, setValue] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);

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

    function updatePostHandler(params: any) {
        const modPosts = posts.map(e => e.id === params.id ? params : e);
        console.log("params")
        setPosts(modPosts);
    }

    function deleteData(params: any) {
        const modPosts = posts.filter(e => e.id !== params.id );
        console.log("params")
        setPosts(modPosts);
    }

    const postTableOptions = {
        filter: true,
        onFilterChange: (changedColumn: any, filterList: any) => {
            console.log(changedColumn, filterList);
        },
        selectableRows: "none",
        filterType: "dropdown",
        responsive: "simple",
        expandableRows: true,
        tableId: "Posts",
        pagination: false,
        elevation: 0,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            console.log(rowData, rowMeta);
            return (
                <PostTableRow rowData={rowData} updateHandler={updatePostHandler} deleteData={deleteData}/>
            );
        }
    };

    async function createPost(param: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(param)
        })

        if (res.ok) {
            const post = await res.json();
            console.log(post);
            setPosts([...posts, post])
        }
        setOpen(false);
    }

    function compareDates(postDate: any, date: Date): unknown {
        const modPostDate = new Date(postDate);
        modPostDate.setHours(0,0,0,0);


        return modPostDate.getTime() === date.getTime()
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
                                if (posts.find(x => compareDates(x.postDate, date))) {
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
                    
                    <Button variant="contained" onClick={() => setOpen(true)}>Add new</Button>
                    {<AddPostDialog onClose={() => setOpen(false)} open={open} onSave={createPost} />}
                    {posts.length !== 0 ? <PostTable data={posts.filter(post => {
                        return value <= new Date(post.postDate) && getFirstDayOfMonth(value.getFullYear(), value.getMonth() + 1) > new Date(post.postDate)
                    }
                    )} columns={PostTableColumns} options={postTableOptions} /> : <React.Fragment />}
                </Paper>
            </Grid>
        </Grid>);
}