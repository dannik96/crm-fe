import SimpleDialog from "@/components/customs/SimpleDialog";
import CustomTable from "@/components/customs/CustomTable";
import LabelDialog from "@/components/customs/LabelDialog";
import TabPanel from "@/components/customs/TabPanel";
import TaskComment from "@/components/projects/tasks/TaskComment";
import TaskDetail from "@/components/projects/tasks/TaskDetail";
import { TaskParticipantsColumns } from "@/data/headers/TaskParticipants";
import { TaskPostsColumns } from "@/data/headers/TaskPosts";
import { TaskSpentsColumns } from "@/data/headers/TaskSpents";
import { Box, Button, Checkbox, Dialog, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Padding } from "@mui/icons-material";


export default function TaskDetailPage(props: any) {
    const commentRef = useRef<any | any>();
    const [value, setValue] = useState(0);
    const [task, setTask] = useState();
    const [spentTime, setSpentTime] = useState([]);
    const [persons, setPersons] = useState();
    const [stateOpen, setStateOpen] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);
    const [taskStates, setTaskStates] = useState();
    const [taskLabels, setTaskLabels] = useState();
    const [managerOpen, setManagerOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const nameRef = useRef();
    const contRef = useRef();
    const [postEdit, setPostEdit] = useState(false);

    let isClearable = {
        isClearable: postEdit
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        fetchTask();
        fetchTaskSpents();
        // TODO - need to add to DB and model
        //fetchParticipants();
        fetchPersons();
        fetchComments();
        fetchTaskStates();
        fetchTaskLabels();
        fetchPosts();
    }, [router])

    const handleAddComment = async (props: any) => {
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
                "task": {
                    "id": router.query.taskId
                }
            })
        })

        if (res.ok) {
            const json = await res.json()
            setComments([...comments, json]);
        }
    }

    async function fetchTaskStates() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task-state/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setTaskStates(json)
        }
    }

    async function fetchTaskLabels() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task-label/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setTaskLabels(json)
        }
    }

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


    async function handleSavePost() {
        let post = task.post;
        post.content = contRef.current.value;
        post.name = nameRef.current.value;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(
                post
            )
        })

        if (res.ok) {
            const json = await res.json()
            setTask({ ...task, post: json });
            setPostEdit(false);
        }
    }

    async function fetchPersons() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/person/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setPersons(json)
        }
    }

    async function fetchPosts() {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/project-post-by-channel", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json);
            setPosts(json)
        }
    }

    const handleManagerClose = async (value: any) => {
        setManagerOpen(false);
        if (router.query.taskId === undefined) {
            return;
        }

        if (value === undefined) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/unset-assignee/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (res.ok) {
                setTask({ ...project, assignedPerson: value });
            }
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/set-assignee/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setTask({ ...task, assignedPerson: value });
        }
    };

    const handleLabelsChange = async (value: any[]) => {
        let addArr = [];
        let delArr = [];
        let res: any;
        for (let i = 0; i < value.length; i++) {
            if (!task.taskLabels.includes(value[i])) {
                addArr.push(value[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/add-label/" + value[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < task.taskLabels.length; i++) {
            if (!value.includes(task.taskLabels[i])) {
                delArr.push(task.taskLabels[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/remove-label/" + task.taskLabels[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if (res.ok) {
            setTask({
                ...task,
                taskLabels: value
            })
        }
        setLabelOpen(false);
    };

    const handleStateChange = async (value: any) => {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/set-state/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setTask({ ...task, taskState: value })
        }
        setStateOpen(false);
    };

    const handleManagerClickOpen = () => {
        setManagerOpen(true);
    };

    const handleLabelClickOpen = () => {
        setLabelOpen(true);
    };

    const handleStateClickOpen = () => {
        setStateOpen(true);
    };

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xl={12} xs={12}>
                {
                    task ?
                        <TaskDetail
                            task={task}
                            showDescription={true}
                            showEditButton={true}
                            setManager={handleManagerClickOpen}
                            removeManager={handleManagerClose}
                            updateLabels={handleLabelClickOpen}
                            updateState={handleStateClickOpen} />
                        : <React.Fragment></React.Fragment>}
                {persons ?
                    <SimpleDialog
                        open={managerOpen}
                        onClose={() => setManagerOpen(false)}
                        onItemClick={handleManagerClose}
                        choices={persons} /> : <React.Fragment />}
                {taskLabels && task ?
                    <LabelDialog
                        open={labelOpen}
                        onClose={() => setLabelOpen(false)}
                        onSave={(selectedValues: any) => handleLabelsChange(selectedValues)}
                        selectedValue={task.taskLabels}
                        choices={taskLabels} /> : <React.Fragment />}
                {taskStates && task ?
                    <SimpleDialog
                        open={stateOpen}
                        onClose={() => setStateOpen(false)}
                        onItemClick={handleStateChange}
                        choices={taskStates} /> : <React.Fragment />}
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
                    <TabPanel value={value} index={2}>
                        <Box height={460} padding={2}>
                            <CustomTable columns={TaskParticipantsColumns} rows={[]} />
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {
                            task && task.post ?
                                <Stack height={460} padding={2} spacing={3}>
                                    <Stack direction={'row'} spacing={1} alignItems={'baseline'}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            defaultValue={task.post.name}
                                            InputProps={{
                                                disabled: postEdit ? false : true,
                                                disableUnderline: postEdit ? false : true
                                            }}
                                            variant="standard"
                                            sx={{
                                                "& fieldset": { border: postEdit ? 1 : 'none' },
                                                maxWidth: 250
                                            }}
                                            inputRef={nameRef}
                                        />
                                        <Box display="flex" justifyContent="center">
                                            {
                                                !postEdit ?
                                                    <IconButton aria-label="delete" onClick={() => {
                                                        setPostEdit(true)
                                                    }}>
                                                        <EditIcon color="primary" />
                                                    </IconButton> :
                                                    <IconButton aria-label="delete" onClick={handleSavePost}>
                                                        <SaveIcon color="primary" />
                                                    </IconButton>
                                            }
                                        </Box>
                                        : <React.Fragment />
                                    </Stack>
                                    <Stack direction={'row'}
                                        alignItems="center"
                                        spacing={1}>
                                        <Typography variant="body1" minWidth={"30%"}>
                                            Post date:
                                        </Typography>
                                        <DatePicker
                                            wrapperClassName="datepicker-mw"
                                            selected={new Date(task.post.postDate)}
                                            onChange={(date: Date) => {
                                                let post = task.post;
                                                post.postDate = date;
                                                setTask({ ...task, post: post })
                                            }}
                                            id="end-date"
                                            disabled={!postEdit}
                                            showTimeSelect
                                            {...isClearable}
                                            dateFormat={"dd.MM.yyyy"}

                                        />
                                    </Stack>
                                    <TextField
                                        id="content"
                                        defaultValue={task.post.content}
                                        inputRef={contRef}
                                        InputProps={{
                                            readOnly: !postEdit,
                                        }}
                                        variant="outlined"
                                        sx={{
                                            "& fieldset": { border: postEdit ? 1 : 'none' },
                                            "& .MuiInputBase-root": { padding: 1 },
                                            padding: 0,
                                            marginBottom: 1
                                        }}
                                        multiline
                                        fullWidth
                                    />
                                </Stack> :
                                <Stack alignItems={'center'} justifyContent={'center'} height={400} width={'100%'}>
                                    <Button variant="contained">
                                        Assign post
                                    </Button>
                                </Stack>
                        }
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
