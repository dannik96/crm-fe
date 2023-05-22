import { Avatar, Chip, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import LabelDialog from "@/components/customs/LabelDialog";
import SimpleDialog from "@/components/customs/SimpleDialog";
import { getData } from "@/util/communicationUtil";

function getLabels(label: any, changeHandler: Function) {
    const handleClick = () => {
        changeHandler(true)
    };

    return (
        <Chip
            label={label ? label.name : ""}
            key={label ? label.id : ""}
            onClick={handleClick}
            color="primary"
            variant={label ? "filled" : "outlined"}
            style={{ minWidth: 100 }}
        />);
}

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        changeAssignee(true)
    }

    return (
        <Chip
            style={{ minWidth: 100 }}
            label={user ? <Typography minWidth={50}>{user.name + " " + user.surname}</Typography> : <Typography minWidth={50}></Typography>}
            variant={user ? "filled" : "outlined"}
            color="primary"
            onClick={handleClick}
            onDelete={user ? handleDeleteAssignee : undefined}
            avatar={<Avatar>{user ? user.name.charAt(0) : ""}</Avatar>} />
    )
}

export default function NewTaskPaper(props: any) {
    const router = useRouter();
    const nameRef = useRef();
    const descRef = useRef();
    const [assignee, setAssignee] = useState()
    const [to, setTo] = useState(new Date())
    const [labels, setLabels] = useState([])
    const [project, setProject] = useState()

    const [assigneeOpen, setAssigneeOpen] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);

    const [persons, setPersons] = useState([]);
    const [projects, setProjects] = useState([]);
    const [fetchedLabels, setFetchedLabels] = useState([]);

    useEffect(() => {
        getData(setPersons, router, "/api/person");
        getData(setLabels, router, "/api/task-label");
        getData(setPersons, router, "/api/project");
    }, [])

    const saveData = async () => {
        const createdProject = await createTask();
        if (assignee)
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + createdProject.id + "/set-manager/" + assignee.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

        for (let index = 0; index < labels.length; index++) {
            const element = labels[index];
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + createdProject.id + "/add-channel/" + element.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        }
        router.reload();
    }

    const createTask = async () => {
        const newTask = {};
        newTask.name = nameRef.current.value;
        newTask.description = descRef.current.value;
        newTask.deadline = to;
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newTask)
        })
        let createdProject;
        if (per.ok) {
            createdProject = await per.json();
            return createdProject;
        } else {
            return undefined;
        }
    }
    
    const handleManagerClose = (param: any) => {
        setAssignee(param);
        setAssigneeOpen(false);
    }


    const handleProjectClose = (param: any) => {
        setProject(param);
        setProjectOpen(false);
    }

    const handleLabelsChange = (param: any) => {
        setLabels(param);
        setLabelOpen(false);
    }
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack spacing={2} m={2}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Typography variant="body1">Name:</Typography>
                            <TextField
                                id="name"
                                variant="standard"
                                defaultValue={""}
                                inputRef={nameRef}>
                            </TextField>
                        </Stack>
                        <IconButton aria-label="save" onClick={saveData}>
                            <SaveIcon color="primary" />
                        </IconButton>
                    </Stack>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Typography>Project:</Typography>
                        {getUserChip(project, setProject, setProjectOpen)}
                    </Stack>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Typography>Assignee:</Typography>
                        {getUserChip(assignee, setAssignee, setAssigneeOpen)}
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={'center'}>
                        <Typography>To:</Typography>
                        <DatePicker
                            selected={to}
                            onChange={(date: Date) => setTo(date)}
                            id="end-date"
                            dateFormat={"dd.MM.yyyy"}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems={'center'} useFlexGap flexWrap="wrap">
                        <Typography>
                            Labels:
                        </Typography>
                        {labels.length !== 0 ? Array.from(labels).map(val =>
                            getLabels(val, setLabelOpen))
                            : getLabels(undefined, setLabelOpen)}
                    </Stack>
                    <Typography>
                        Description:
                    </Typography>
                    <TextField
                        id="name"
                        variant="outlined"
                        multiline
                        fullWidth
                        defaultValue={""}
                        minRows={4}
                        inputRef={descRef} />
                </Stack>
            </Paper>
            {persons.length ?
                <SimpleDialog
                    open={assigneeOpen}
                    onClose={() => setAssigneeOpen(false)}
                    onItemClick={handleManagerClose}
                    choices={persons} /> : <React.Fragment />}
            {projects.length ?
                <SimpleDialog
                    open={projectOpen}
                    onClose={() => setProjectOpen(false)}
                    onItemClick={handleProjectClose}
                    choices={projects} /> : <React.Fragment />}
            {fetchedLabels ?
                <LabelDialog
                    open={labelOpen}
                    onSave={(selectedValues: any) => handleLabelsChange(selectedValues)}
                    selectedValue={labels}
                    onClose={() => setLabelOpen(false)}
                    choices={fetchedLabels} /> : <React.Fragment />}
        </Grid>)
}

