import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import Link from "next/link";

function getLabels(label: any, addHandler: Function, removeHandler: Function) {
    const handleClick = () => {
        removeHandler(label.id)
    };

    const handleDelete = () => {
        removeHandler(label.id)
    };
    return (
        <Chip
            label={label.name}
            onClick={handleClick}
            onDelete={handleDelete}
            id={label}
            key={label.id}
        />);
}

export default function EventTableRow(props: any) {
    console.log(props.rowData)
    const [event, setEvent] = useState(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchEvent();
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

    const handleChange = (event: SelectChangeEvent) => {
        //setState(event.target.value);
    };

    const handleSave = (props: any) => {
        setEditMode(false);
        console.log(props)
    }

    // TODO
    const handleAddLabels = (id: any) => {

        console.log(id);
    }
    const handleRemoveLabels = (id: any) => {
        //props.updateLabels(labels);
        // setLabels(labels.filter((label: { id: any; }) =>
        //     label.id !== id
        // ))
    }

    // TODO
    const handleAddTask = (id: any) => {

        console.log(id);
    }
    const handleRemoveTask = (id: any) => {
        //props.updateLabels(labels);
        // setTasks(tasks.filter((task: { id: any; }) =>
        //     task.id !== id
        // ))
    }
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
                                <TextField
                                    id="startDate"
                                    label="Start date"
                                    defaultValue={new Date(event.startDate).toLocaleDateString()}
                                    InputProps={{
                                        disabled: editMode ? false : true,
                                        disableUnderline: editMode ? false : true
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                        maxWidth: 250,
                                    }}
                                />
                                <TextField
                                    id="endDate"
                                    label="End date"
                                    defaultValue={new Date(event.endDate).toLocaleDateString()}
                                    InputProps={{
                                        disabled: editMode ? false : true,
                                        disableUnderline: editMode ? false : true
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                        maxWidth: 250,
                                    }}
                                />
                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography variant="body1">Tasks: </Typography>
                                    {Array.from(event.eventTypes).map((value, index) => (
                                        getLabels(value, handleAddTask, handleRemoveTask)
                                    ))}
                                </Stack>
                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography>Project: </Typography>
                                    <Link href={"/projects/projects/" + event.project.id} >
                                        <Typography>{event.project.name}</Typography>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={1}>
                            <Box display="flex" justifyContent="center">
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
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                    <Box py={2} px={3}>
                        <Typography variant="body1">
                            {event.description}
                        </Typography>
                    </Box>
                </TableCell> : <React.Fragment />
            }
        </TableRow>
    );
}