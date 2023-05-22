import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LabelDialog from "../customs/LabelDialog";
import AddIcon from '@mui/icons-material/Add';
import SimpleDialog from "../customs/SimpleDialog";


function getLabels(label: any, addHandler: Function, editable: boolean) {
    const handleClick = () => {
        if (editable)
            addHandler()
    };

    return (
        <Chip
            key={label.id}
            label={label.name}
            onClick={handleClick}
            id={label.id}
            color="primary"
            clickable={editable}
            variant={editable ? "filled" : "outlined"}
            style={{ minWidth: 100 }}
        />);
}

function getProjectChip(project: any, unnassigneHandler: Function, changeAssignee: Function) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        changeAssignee()
    }
    let deletable = {};
    if (project) {
        deletable = { onDelete: handleDeleteAssignee }
    }
    return (
        <Chip
            style={{ minWidth: 100 }}
            id={project ? project.id : -1}
            label={project ? <Typography minWidth={50}>{project.name}</Typography> : <AddIcon style={{ color: "white" }} />}
            variant={"filled"}
            color="primary"
            onClick={handleClick}
            {...deletable} />
    )
}

export default function EventTableRow(props: any) {
    console.log(props)
    const [event, setEvent] = useState(undefined);
    const [editMode, setEditMode] = useState(false);
    const [labelOpen, setLabelOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);
    const [projects, setProjects] = useState([]);
    const nameRef = useRef();
    const descRef = useRef();
    let isClearable = {
        isClearable: editMode
    }

    useEffect(() => {
        fetchEvent();
        fetchEventTypes();
        fetchProjects();
    }, [])

    async function fetchEvent() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/` + props.rowData[0], {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setEvent(json)
        }
    }

    async function fetchProjects() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setProjects(json)
        }
    }
    async function fetchEventTypes() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event-type/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setEventTypes(json)
        }
    }

    const handleSave = async () => {
        setEditMode(false);
        event.description = descRef.current.value;
        event.name = nameRef.current.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(event)
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            props.updateHandler(json);
        }
    }

    const handleLabelsChange = async (value: any[]) => {
        let addArr = [];
        let delArr = [];
        let res: any;
        for (let i = 0; i < value.length; i++) {
            if (!event.eventTypes.includes(value[i])) {
                addArr.push(value[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/` + event.id + "/add-type/" + value[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < event.eventTypes.length; i++) {
            if (!value.includes(event.eventTypes[i])) {
                delArr.push(event.eventTypes[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/` + event.id + "/remove-type/" + event.eventTypes[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if (res.ok) {
            setEvent({
                ...event,
                eventTypes: value
            })
        }
        setLabelOpen(false);
    };

    const handleProjectClose = async (value: any) => {
        setProjectOpen(false);

        if (value === undefined) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/` + event.id + "/unset-project/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (res.ok) {
                setEvent({ ...event, project: value });
            }
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event/` + event.id + "/set-project/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setEvent({ ...event, project: value });
        }
        console.log(value)
    };

    const handleLabelClickOpen = () => {
        if (editMode)
            setLabelOpen(true);
    };

    const handleProjectClickOpen = () => {
        setProjectOpen(true);
    };

    console.log(event ? event.eventTypes.length : "")
    return (
        <TableRow>
            {event ?
                <TableCell colSpan={props.rowData.length + 1}>
                    <Grid container py={3} px={2}>
                        <Grid item xs={11}>
                            <Stack spacing={2}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    defaultValue={event.name}
                                    inputRef={nameRef}
                                    InputProps={{
                                        disabled: editMode ? false : true,
                                        disableUnderline: editMode ? false : true
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                        maxWidth: 250
                                    }}
                                />
                                <Stack direction={'row'}
                                    alignItems="center"
                                    spacing={1}>
                                    <Typography variant="body1">
                                        Start:
                                    </Typography>
                                    <DatePicker
                                        selected={new Date(event.startDate)}
                                        onChange={(date: Date) => setEvent({ ...event, startDate: date })}
                                        id="end-date"
                                        disabled={!editMode}
                                        showTimeSelect
                                        dateFormat={"dd.MM.yyyy"}
                                    />
                                </Stack>
                                <Stack direction={'row'}
                                    alignItems="center"
                                    spacing={1}>
                                    <Typography variant="body1">
                                        End:
                                    </Typography>
                                    <DatePicker
                                        selected={new Date(event.endDate)}
                                        onChange={(date: Date) => setEvent({ ...event, endDate: date })}
                                        id="end-date"
                                        disabled={!editMode}
                                        showTimeSelect
                                        dateFormat={"dd.MM.yyyy"}
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography variant="body1">Type: </Typography>
                                    {
                                        event.eventTypes.filter((eventType: any) => !eventType.deleted).length !== 0 ?
                                            Array.from(event.eventTypes).map((value: any) => (
                                                getLabels(value, handleLabelClickOpen, editMode)
                                            ))
                                            : <Chip
                                                key={"plus"}
                                                label={
                                                    <AddIcon style={{ color: editMode ? "white" : "#1976d2" }} />
                                                }
                                                onClick={() => handleLabelClickOpen()}
                                                id={"plus"}
                                                color="primary"
                                                clickable={editMode}
                                                variant={editMode ? "filled" : "outlined"}
                                                style={{ minWidth: 100 }}
                                            />
                                    }
                                    {eventTypes ?
                                        <LabelDialog
                                            open={labelOpen}
                                            onClose={() => setLabelOpen(false)}
                                            onSave={(selectedValues: any) => handleLabelsChange(selectedValues)}
                                            selectedValue={event.eventTypes}
                                            choices={eventTypes} /> : <React.Fragment />}
                                </Stack>
                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography>Project: </Typography>
                                    {editMode ?
                                        getProjectChip(event.project, handleProjectClose, handleProjectClickOpen)
                                        :
                                        event.project ? <Link href={"/projects/projects/" + event.project.id} >
                                            <Typography>{event.project.name}</Typography>
                                        </Link> : <React.Fragment />
                                    }
                                    {projects ?
                                        <SimpleDialog
                                            open={projectOpen}
                                            onClose={() => setProjectOpen(false)}
                                            onItemClick={handleProjectClose}
                                            choices={projects} /> : <React.Fragment />}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={1}>
                            <Stack direction={'column'}>
                                <IconButton aria-label="edit" onClick={() => {
                                    props.deleteData(event)
                                }}>
                                    <DeleteIcon color="primary" />
                                </IconButton>
                                {
                                    editMode ?
                                        <IconButton aria-label="delete" onClick={handleSave}>
                                            <SaveIcon color="primary" />
                                        </IconButton> :
                                        <IconButton aria-label="delete" onClick={() => {
                                            console.log("edit mode");
                                            setEditMode(true)
                                        }}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                    <Box py={2} px={3}>
                        <TextField
                            id="description"
                            defaultValue={event.description}
                            inputRef={descRef}
                            InputProps={{
                                readOnly: !editMode,
                            }}
                            variant="outlined"
                            sx={{
                                "& fieldset": { border: editMode ? 1 : 'none' },
                                padding: 0,
                                marginBottom: 1
                            }}
                            multiline
                            fullWidth
                        />
                    </Box>
                </TableCell> : <React.Fragment />
            }
        </TableRow>
    );
}