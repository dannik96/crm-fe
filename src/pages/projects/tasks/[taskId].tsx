import SimpleDialog from "@/components/customs/SimpleDialog";
import CustomTable from "@/components/customs/CustomTable";
import LabelDialog from "@/components/customs/LabelDialog";
import TabPanel from "@/components/customs/TabPanel";
import TaskComment from "@/components/projects/tasks/TaskComment";
import TaskDetail from "@/components/projects/tasks/TaskDetail";
import { TaskParticipantsColumns } from "@/data/headers/TaskParticipants";
import { TaskSpentsColumns } from "@/data/headers/TaskSpents";
import { Box, Button, Divider, FormGroup, Grid, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { getData } from "@/util/communicationUtil";
import AddTimeDialog from "@/components/customs/AddTimeDialog";


export default function TaskDetailPage(props: any) {
    const commentRef = useRef<any | any>();
    const [value, setValue] = useState(0);
    const [task, setTask] = useState();
    const [spentTime, setSpentTime] = useState([]);
    const [persons, setPersons] = useState();
    const [stateOpen, setStateOpen] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);
    const [postOpen, setPostOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [taskStates, setTaskStates] = useState();
    const [taskLabels, setTaskLabels] = useState();
    const [managerOpen, setManagerOpen] = useState(false);
    const [spentTimeOpen, setSpentTimeOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [projects, setProjects] = useState([]);
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
        if (router.query.taskId === undefined) {
            return;
        }
        getData(setTask, router, "/api/task/" + router.query.taskId);
        getData(setSpentTime, router, "/api/task/" + router.query.taskId + "/spent-time");
        getData(setPersons, router, "/api/person/");
        getData(setComments, router, "/api/task/" + router.query.taskId + "/comments");
        getData(setTaskStates, router, "/api/task-state/");
        getData(setTaskLabels, router, "/api/task-label/");
        getData(setPosts, router, "/api/task/" + router.query.taskId + "/project-post-by-channel");
        getData(setProjects, router, "/api/project/");

        // TODO - need to add to DB and model
        //fetchParticipants();
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
                    "id": localStorage.getItem('id')
                },
                "task": {
                    "id": router.query.taskId
                }
            })
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setComments([...comments, json]);
            console.log(comments)
        }
    }

    async function editTask(param: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(
                param
            )
        })

        if (res.ok) {
            setTask({ ...task });
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
                setTask({ ...task, assignedPerson: value });
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
            console.log(task)
            console.log(value)
            const newTask = {...task, assignedPerson : value};
            setTask(newTask);
            console.log(task)
            console.log(newTask)
        }
    };

    const handleProjectClose = async (value: any) => {
        setProjectOpen(false);
        if (router.query.taskId === undefined) {
            return;
        }

        if (value === undefined) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/unset-project/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (res.ok) {
                setTask({ ...project, PromiseRejectionEvent: value });
            }
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/set-project/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setTask({ ...task, project: value });
        }
    };

    const handleLabelsChange = async (value: any[]) => {
        let res: any;
        const filteredLabels = await task.taskLabels.filter(label => !label.deleted);
        for (let i = 0; i < value.length; i++) {
            if (filteredLabels.filter(val => val.id === value[i].id).length === 0) {
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/add-label/" + value[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < filteredLabels.length; i++) {
            if (value.filter(val => val.id !== filteredLabels[i].id).length === 0) {
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + task.id + "/remove-label/" + filteredLabels[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if (res && res.ok) {
            const newTask = { ...task, taskLabels: value }
            setTask(newTask)
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
            console.log(task.taskState);
            console.log(value);
            setTask({ ...task, taskState: value })
        }
        setStateOpen(false);
    };


    const handleAddTimeSpent = async (time, date) => {
        if (router.query.taskId === undefined || !localStorage.getItem('id')) {
            return;
        }

        const parts = time.split(/h|m/);

        const hours = parts[0] ? parseInt(parts[0]) : 0;
        const minutes = parts[1] ? parseInt(parts[1]) : 0;

        const total = hours * 60 + minutes;

        const data = {
            date: date,
            time: total,
            userId: localStorage.getItem('id'),
            task: task
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/time-spent/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })

        if (res.ok) {
            const json = await res.json();
            setSpentTime([...spentTime, json])
        }
        setSpentTimeOpen(false);
    };

    const handleAssignPost = async (value: any) => {
        if (router.query.taskId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + router.query.taskId + "/add-post/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setTask({ ...task, post: value })
        }
        setPostOpen(false);
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

    const handleProjectClickOpen = () => {
        setProjectOpen(true);
    };

    const deleteData = async (id: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            router.replace('/projects/tasks')
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
                            editTask={editTask}
                            deleteData={deleteData}
                            setProject={handleProjectClickOpen}
                            unsetProject={handleProjectClose}
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
                        selectedValue={task.taskLabels.filter(taskLabel => !taskLabel.deleted)}
                        choices={taskLabels} /> : <React.Fragment />}
                {taskStates && task ?
                    <SimpleDialog
                        open={stateOpen}
                        onClose={() => setStateOpen(false)}
                        onItemClick={handleStateChange}
                        choices={taskStates} /> : <React.Fragment />}
                {projects && task ?
                    <SimpleDialog
                        open={projectOpen}
                        onClose={() => setProjectOpen(false)}
                        onItemClick={handleProjectClose}
                        choices={projects} /> : <React.Fragment />}
            </Grid>
            <Grid item xl={4}>
                <Paper style={{ height: 550, width: '100%' }}>
                    <Box display="flex" width="100%" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons={false}
                            aria-label="scrollable prevent tabs example"
                        >
                            <Tab label="Time spents" />
                            <Tab label="Post" />
                            {/* <Tab label="Participants" /> */}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Box height={460} padding={2}>
                            <CustomTable columns={TaskSpentsColumns} rows={spentTime} />
                        </Box>
                        <Grid container>
                            <Grid item xl={12} mx={2}>
                                <Button fullWidth color="primary" variant="contained" onClick={() => setSpentTimeOpen(true)}>
                                    Add time
                                </Button>
                                {spentTime && task ?
                                    <AddTimeDialog
                                        open={spentTimeOpen}
                                        onClose={() => setSpentTimeOpen(false)}
                                        onSave={(time, date) => handleAddTimeSpent(time, date)} /> : <React.Fragment />}
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <Box height={460} padding={2}>
                            <CustomTable columns={TaskParticipantsColumns} rows={[]} />
                        </Box>
                    </TabPanel> */}
                    <TabPanel value={value} index={1}>
                        {
                            task && task.post && !task.post.deleted ?
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
                                    <Button variant="contained" onClick={() => setPostOpen(true)}>
                                        Assign post
                                    </Button>
                                    {posts ?
                                        <SimpleDialog
                                            open={postOpen}
                                            onClose={() => setPostOpen(false)}
                                            onItemClick={handleAssignPost}
                                            choices={posts} /> : <React.Fragment />}
                                </Stack>

                        }
                    </TabPanel>
                </Paper>
            </Grid>
            <Grid item xl={8}>
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
                                    onClick={handleAddComment}>Add comment</Button>
                            </Grid>
                        </FormGroup>
                    </Box>
                </Paper>
            </Grid>
        </Grid>);
}
