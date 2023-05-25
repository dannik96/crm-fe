import { Paper, Box, Grid, Divider, Stack, Typography, Chip, Avatar, TextField, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useRef } from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function getLabels(label: any, addHandler: Function, removeHandler: Function, editable: boolean) {
    const handleClick = () => {
        addHandler(label.id)
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

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function, disabled: boolean) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        changeAssignee()
    }

    return (
        <Chip
            style={{ minWidth: 100 }}
            id={user ? user.id : -1}
            label={user ? <Typography minWidth={50}>{user.name + " " + user.surname}</Typography> : <Typography minWidth={50}></Typography>}
            variant={disabled ? "filled" : "outlined"}
            color="primary"
            onClick={handleClick}
            onDelete={disabled ? handleDeleteAssignee : undefined}
            clickable={disabled}
            avatar={<Avatar>{user ? user.name.charAt(0) : ""}</Avatar>} />
    )
}

export default function TaskDetail(props: any) {
    const [task, setTask] = useState({ ...props.task });

    const [disabled, setDisabled] = useState(true);
    const [deadline, setDeadline] = useState(new Date(task.deadline))

    const nameRef = useRef();
    const descRef = useRef();

    const handleSave = () => {
        setDisabled(true);
        task.name = nameRef.current.value;
        task.description = descRef.current.value;
        task.deadline = deadline;
        props.editTask(task);
    }
    
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                maxWidth: '100%',
                flexDirection: 'column',
            }}>
            {props.task ?
                <Box sx={{ my: 3, mx: 2, mb: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xl={11}>
                            <Stack
                                direction={{ xs: 'column', xl: 'row' }}
                                divider={<Divider orientation="vertical" flexItem />}
                                spacing={{ xs: 1, xl: 5 }}>
                                <Stack
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-around"
                                    minWidth={{ xl: 350, xs: 200 }}
                                    spacing={2}>
                                    <TextField
                                        id="name"
                                        defaultValue={task.name}
                                        InputProps={{
                                            readOnly: disabled,
                                            disableUnderline: disabled,
                                            style: { fontSize: 40, padding: 0 },

                                        }}
                                        inputRef={nameRef}
                                        variant="standard"
                                        sx={{
                                            "& fieldset": { border: disabled ? 1 : 'none' },
                                            "#name": { padding: 0 },
                                            padding: 0,
                                        }}
                                    />
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography variant="body1">Project:</Typography>
                                        {
                                            task.project ?
                                                <Link href={"/projects/projects/" + task.project.id} style={{ textDecoration: 'none' }}>
                                                    <Typography variant="h6" component="div">{task.project.name}</Typography>
                                                </Link> :
                                                getUserChip(task.project, props.unsetProject, props.setProject, props.showEditButton)
                                        }
                                    </Stack>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <Typography variant="body1">Assignee:</Typography>
                                        {
                                            getUserChip(task.assignedPerson, props.removeManager, props.setManager, props.showEditButton)
                                        }
                                    </Stack>


                                </Stack>

                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="space-around"
                                    minWidth={150}>
                                    <Stack direction={'row'}
                                        alignItems="center"
                                        justifyContent="space-between"
                                        spacing={1}>
                                        <Typography variant="body1">
                                            From:
                                        </Typography>
                                        <DatePicker
                                            selected={deadline}
                                            onChange={(date: Date) => setDeadline(date)}
                                            id="start-date"
                                            disabled={disabled}
                                            dateFormat={"dd.MM.yyyy"}
                                        />
                                    </Stack>
                                    <Stack width="100%" direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                        <Typography>State</Typography>
                                        {
                                            !task.taskState || task.taskState.deleted ?
                                                <Chip
                                                    key={"plus"}
                                                    label={
                                                        <AddIcon style={{ color: props.showEditButton ? "white" : "#1976d2" }} />
                                                    }
                                                    onClick={() => props.updateState()}
                                                    id={"plus"}
                                                    color="primary"
                                                    clickable={props.showEditButton}
                                                    variant={props.showEditButton ? "filled" : "outlined"}
                                                    style={{ minWidth: 100 }}
                                                /> :
                                                getLabels(task.taskState, props.updateState, () => { }, props.showEditButton)
                                        }
                                    </Stack>
                                </Stack>
                                <Stack direction={"row"} spacing={1} useFlexGap flexWrap="wrap">
                                    {
                                        props.task.taskLabels.filter(val => !val.deleted).length !== 0 ?
                                            Array.from(props.task.taskLabels.filter(val => !val.deleted)).map((value: any) => (
                                                getLabels(value, props.updateLabels, () => undefined, props.showEditButton)
                                            ))
                                            : props.showEditButton ?
                                                <Chip
                                                    key={"plus"}
                                                    label={
                                                        <AddIcon style={{ color: "white" }} />
                                                    }

                                                    onClick={props.updateLabels}
                                                    id={"plus"}
                                                    color="primary"
                                                    clickable={props.showEditButton}
                                                    variant={props.showEditButton ? "filled" : "outlined"}
                                                    style={{ minWidth: 100 }}
                                                /> : <React.Fragment />
                                    }
                                </Stack>
                            </Stack>
                        </Grid>
                        {props.showEditButton ?
                            <Grid item xl={1}>
                                <Stack direction={'column'}>
                                    <IconButton aria-label="edit" onClick={() => {
                                        props.deleteData(task.id)
                                    }}>
                                        <DeleteIcon color="primary" />
                                    </IconButton>
                                    {
                                        disabled ?
                                            <IconButton aria-label="delete" onClick={() => {
                                                setDisabled(false)
                                            }}>
                                                <EditIcon color="primary" />
                                            </IconButton> :
                                            <IconButton aria-label="delete" onClick={handleSave}>
                                                <SaveIcon color="primary" />
                                            </IconButton>
                                    }
                                </Stack>
                            </Grid> : <React.Fragment />
                        }
                    </Grid>
                </Box>
                : <React.Fragment />}
            {
                props.showDescription ?
                    <React.Fragment>
                        <Divider variant="middle" />
                        <Box px={{ xl: 2, xs: 3 }}
                            py={{ xl: 2, xs: 2 }}>
                            <TextField
                                id="description"
                                defaultValue={task.description}
                                InputProps={{
                                    readOnly: disabled,

                                }}
                                fullWidth
                                multiline
                                inputRef={descRef}
                                variant="outlined"
                                sx={{
                                    "& fieldset": { border: disabled ? 'none' : "1 px" },
                                }}
                            />
                        </Box>
                    </React.Fragment> : <React.Fragment></React.Fragment>
            }
        </Paper >
    );
}