import CustomTable from "@/components/customs/CustomTable";
import TabPanel from "@/components/customs/TabPanel";
import TaskComment from "@/components/projects/tasks/TaskComment";
import TaskDetail from "@/components/projects/tasks/TaskDetail";
import { TaskParticipantsColumns } from "@/data/headers/TaskParticipants";
import { TaskPostsColumns } from "@/data/headers/TaskPosts";
import { TaskSpentsColumns } from "@/data/headers/TaskSpents";
import { Box, Button, Divider, FormControl, FormGroup, Grid, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const data = {
    name: "Task name",
    assignee: { id: 1, name: "User user" },
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies. Pellentesque vehicula placerat mollis. Aenean id blandit urna, ut lobortis metus. Sed id tincidunt velit. Nulla facilisi. Fusce sapien nisi, sodales ac elit a, aliquet pulvinar nisi. Mauris venenatis magna eget magna pharetra consectetur. Praesent et arcu nisi. Nullam fermentum lectus a dictum fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent condimentum arcu ut fringilla placerat. Vivamus porttitor ligula vel viverra iaculis. Nulla a scelerisque justo. In ut sem quis ligula bibendum euismod. Duis quis mattis elit. Aliquam consectetur tortor euismod nisl posuere vulputate. Nullam tempus ornare laoreet. Nullam viverra quam eget ultricies tempus. Etiam fringilla sollicitudin libero, eget dictum nisl mattis sit amet. Fusce fermentum tortor neque, ut imperdiet diam imperdiet vitae. Phasellus a maximus felis. Etiam ultrices, lacus id luctus eleifend, augue sapien pretium sapien, vitae facilisis mauris ipsum auctor felis. Phasellus eget dictum sem. Nulla nec augue libero.",
    deadline: "26.5.2023",
    priority: 1,
    label: [{ id: 1, name: "Labelname1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
    { id: 2, name: "Labelname1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
    { id: 3, name: "Labelname1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
    { id: 4, name: "Labelname1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
    { id: 5, name: "Labelname1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." }],
    state: { name: "State name", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    project: { id: 1, name: "Project name" },

    spent:
        [{ id: 1, date: "15.4.2023", time: 3600000, user: { id: 1, name: "User user" } },
        { id: 2, date: "15.4.2023", time: 3600000, user: { id: 2, name: "Admin admin" } },
        { id: 3, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 4, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 5, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 6, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 7, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 8, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 9, date: "15.4.2023", time: 3600000, user: { id: 3, name: "Task user" } },
        { id: 10, date: "15.4.2023", time: 3600000, user: { id: 1, name: "User user" } },],
    participants:
        [{ id: 1, name: "User user" }, { id: 2, name: "Admin admin" }, { id: 3, name: "Task user" }, { id: 4, name: "Commenter commenter" }],
    comments:
        [{ id: 1, date: "2.2.2022", user: { id: 1, name: "User user" }, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 5, date: "2.2.2022", user: { id: 1, name: "User user" }, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 2, date: "2.2.2022", user: { id: 1, name: "User user" }, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 10, date: "2.2.2022", user: { id: 1, name: "User user" }, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 20, date: "2.2.2022", user: { id: 1, name: "User user" }, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 12, date: "2.2.2022", user: { id: 1, name: "User user" }, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },],
    posts:
        [{ id: 1, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 2, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 3, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 4, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },
        { id: 5, name: "Post 1", postDate: "2.2.2023", state: { name: "State 1", description: "Lorem ipsum dolor sit amet." }, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus lectus eu mi posuere, a ultrices lorem ultricies." },]
}

export default function TaskDetailPage(props: any) {
    const commentRef = useRef();
    const [value, setValue] = useState(0);
    const [task, setTask] = useState();
    const [spentTime, setSpentTime] = useState([]);
    const [posts, setPosts] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [comments, setComments] = useState();
    const router = useRouter();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const setLabels = (labels: any) => {
        console.log("set Labels")
        data.label = labels;
    }

    const handleAddComment = async (props: any) => {
        console.log(commentRef.current.value)
        if (router.query.taskId === undefined || commentRef === undefined || commentRef.current === undefined 
            || commentRef.current.value === "") {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comment`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "text": commentRef.current.value,
                "person": {
                    "id": 5
                },
                "task" : {
                    "id" : router.query.taskId
                }
            })
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
        }
    }

    useEffect(() => {
        fetchTask();
        fetchTaskSpents();
        fetchPosts();
        // TODO - need to add to DB and model
        //fetchParticipants();
        fetchComments();
    }, [router])
    async function fetchComments() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/comments", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            setComments(json)
        }
    }
    async function fetchPosts() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/posts", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setPosts(json)
        }
    }

    async function fetchParticipants() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/spent-time", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setSpentTime(json)
        }
    }

    async function fetchTaskSpents() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/spent-time", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setSpentTime(json)
        }
    }

    async function fetchTask() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setTask(json)
        }
    }

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xl={12} xs={12}>
                {
                    task ?
                        <TaskDetail
                            task={task}
                            showDescription={true}
                            showEditButton={true}
                            name={data.name}
                            assignee={data.assignee}
                            label={data.label}
                            state={data.state}
                            description={data.description}
                            deadline={data.deadline}
                            priority={data.priority}
                            project={data.project}
                            updateLabels={setLabels} />
                        : <React.Fragment></React.Fragment>}
            </Grid>
            <Grid item xl={4}>
                <Paper style={{ height: 500, width: '100%' }}>
                    <Box display="flex" width="100%" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="scrollable prevent tabs example"
                        >
                            <Tab label="Time spents" />
                            <Tab label="Posts" />
                            <Tab label="Participants" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Box height={460} padding={2}>
                            <CustomTable columns={TaskSpentsColumns} rows={spentTime} />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box height={460} padding={2}>
                            <CustomTable columns={TaskPostsColumns} rows={posts} />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Box height={460} padding={2}>
                            <CustomTable columns={TaskParticipantsColumns} rows={data.participants} />
                        </Box>
                    </TabPanel>
                </Paper>
            </Grid>
            <Grid item xl={8} padding={4}>
                <Paper sx={{ padding: 3, height: 500, width: '100%', overflow: 'auto' }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{ my: 3, mx: 2, mb: 3 }}>
                        <Typography variant="h4">
                            Comments
                        </Typography>
                    </Stack>
                    <Divider variant="middle" style={{ marginBottom: 10 }} />
                    <Box sx={{ paddingX: 2 }}>
                        <Stack spacing={3} py={2}>
                            {Array.from(comments ? comments : []).map((value, index) => (
                                <TaskComment comment={value} key={index} />
                            ))}
                        </Stack>
                        <FormGroup>
                            <Box py={2} width={'100%'}>
                                <TextField
                                    fullWidth={true}
                                    id="comment"
                                    label="Comment"
                                    type="search"
                                    variant="filled"
                                    inputRef={commentRef}
                                    multiline={true}
                                    minRows={3}
                                />
                            </Box>
                            <Grid container justifyContent="flex-end" paddingBottom={5}>
                                <Button variant="contained"
                                    onClick={handleAddComment}>Contained</Button>
                            </Grid>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>);
}