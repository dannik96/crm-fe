import { Avatar, Chip, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import SimpleDialog from "../customs/SimpleDialog";
import React from "react";
import LabelDialog from "../customs/LabelDialog";
import { useRouter } from "next/router";

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

export default function NewProjectPaper(props: any) {
    const router = useRouter();
    const nameRef = useRef();
    const descRef = useRef();
    const [manager, setManager] = useState()
    const [from, setFrom] = useState(new Date())
    const [to, setTo] = useState(new Date())
    const [label, setLabel] = useState()
    const [channels, setChannels] = useState([])

    const [managerOpen, setManagerOpen] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);
    const [channelOpen, setChannelOpen] = useState(false);

    const [persons, setPersons] = useState([]);
    const [labels, setLabels] = useState([]);
    const [fetchedChannels, setFetchedChannels] = useState([]);

    useEffect(() => {
        fetchPersons();
        fetchLabels();
        fetchChannels();
    }, [])

    const saveData = async () => {
        console.log("create")
        const createdProject = await createProject();
        console.log(createdProject)
        if (manager)
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + createdProject.id + "/set-manager/" + manager.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

        if (label)
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + createdProject.id + "/set-type/" + label.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

        for (let index = 0; index < channels.length; index++) {
            const element = channels[index];
            console.log(element)
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
    const createProject = async () => {
        const newProject = {};
        newProject.name = nameRef.current.value;
        newProject.description = descRef.current.value;
        newProject.start = from;
        newProject.deadline = to;
        console.log(newProject)
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newProject)
        })
        let createdProject;
        if (per.ok) {
            createdProject = await per.json();
            return createdProject;
        } else {
            console.log("nok");
            return undefined;
        }
    }
    const fetchPersons = async () => {
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/person`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (per.ok) {
            const res = await per.json();
            setPersons(res)
        }
    }

    const fetchLabels = async () => {
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project-type`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (per.ok) {
            const res = await per.json();
            setLabels(res)
        }
    }

    const fetchChannels = async () => {
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (per.ok) {
            const res = await per.json();
            setFetchedChannels(res)
        }
    }

    const handleManagerClose = (param: any) => {
        setManager(param);
        setManagerOpen(false);
    }

    const handleLabelClose = (param: any) => {
        setLabel(param);
        setLabelOpen(false);
    }


    const handleLabelsChange = (param: any) => {
        setChannels(param);
        setChannelOpen(false);
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
                        <Typography>Manager:</Typography>
                        {getUserChip(manager, setManager, setManagerOpen)}
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={'center'}>
                        <Typography>From:</Typography>
                        <DatePicker
                            selected={from}
                            onChange={(date: Date) => setFrom(date)}
                            id="start-date"
                            dateFormat={"dd.MM.yyyy"}
                        />
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
                    <Stack direction={"row"} spacing={2} alignItems={'center'}>
                        <Typography>
                            Label:
                        </Typography>
                        {getLabels(label, setLabelOpen)}
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems={'center'} useFlexGap flexWrap="wrap">
                        <Typography>
                            Channels:
                        </Typography>
                        {channels.length !== 0 ? Array.from(channels).map(val =>
                            getLabels(val, setChannelOpen))
                            : getLabels(undefined, setChannelOpen)}
                    </Stack>
                    <Typography>
                        Description:
                    </Typography>
                    <TextField
                        id="name"
                        variant="outlined"
                        multiline
                        fullWidth
                        minRows={4}
                        defaultValue={""}
                        inputRef={descRef} />
                </Stack>
            </Paper>
            {persons.length ?
                <SimpleDialog
                    open={managerOpen}
                    onClose={() => setManagerOpen(false)}
                    onItemClick={handleManagerClose}
                    choices={persons} /> : <React.Fragment />}
            {labels.length ?
                <SimpleDialog
                    open={labelOpen}
                    onClose={() => setLabelOpen(false)}
                    onItemClick={handleLabelClose}
                    choices={labels} /> : <React.Fragment />}
            {fetchedChannels ?
                <LabelDialog
                    open={channelOpen}
                    onSave={(selectedValues: any) => handleLabelsChange(selectedValues)}
                    selectedValue={channels}
                    onClose={() => setChannelOpen(false)}
                    choices={fetchedChannels} /> : <React.Fragment />}
        </Grid>)
}

