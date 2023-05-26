import { Paper, Box, Grid, Stack, Divider, Typography, TextField, Chip, IconButton, Avatar } from "@mui/material";
import React, { useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DatePicker from "react-datepicker";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import "react-datepicker/dist/react-datepicker.css";

function getLabels(label: any, changeHandler: Function, showEditButton: boolean) {
    const handleClick = () => {
        if (showEditButton)
            changeHandler()
    };

    return (
        <Chip
            label={label.name}
            onClick={handleClick}
            id={label}
            key={label.id}
            color="primary"
            clickable={showEditButton}
            variant={showEditButton ? "filled" : "outlined"}
            style={{ minWidth: 100 }}
        />);
}

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function, showEditButton: boolean) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        if (showEditButton)
            changeAssignee()
    }

    return (
        <Chip
            style={{ minWidth: 100 }}
            id={user ? user.id : undefined}
            label={user ? <Typography minWidth={50}>{user.name + " " + user.surname}</Typography> : <Typography minWidth={50}></Typography>}
            variant={showEditButton ? "filled" : "outlined"}
            color="primary"
            onClick={handleClick}
            onDelete={showEditButton ? handleDeleteAssignee : undefined}
            clickable={showEditButton}
            avatar={<Avatar>{user ? user.name.charAt(0) : ""}</Avatar>} />
    )
}

export default function ProjectDetail(props: any) {
    const project = props.project;

    const [disabled, setDisabled] = useState(true);
    const [startDate, setStartDate] = useState(new Date(project.start));
    const [deadline, setDeadline] = useState(new Date(project.deadline));


    const nameRef = useRef();
    const descRef = useRef();
    const handleSave = () => {
        setDisabled(true);
        project.name = nameRef.current.value;
        project.description = descRef.current.value;
        project.start = startDate;
        project.deadline = deadline;
        props.editProject(project);
    }

    function toHHMMSS(sec_num: number) {
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        var finalHours;
        var finalMinutes;
        var finalSeconds;


        if (hours < 10) { finalHours = "0" + hours; }
        if (minutes < 10) { finalMinutes = "0" + minutes; }
        if (seconds < 10) { finalSeconds = "0" + seconds; }
        return finalHours + ':' + finalMinutes + ':' + finalSeconds;
    }

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                maxWidth: '100%',
                flexDirection: 'column',
            }}>
            <Box sx={{ my: 3, mx: 2, mb: 3 }}>
                <Grid container>
                    <Grid item xl={11} >
                        <Stack
                            direction={{ xs: 'column', xl: 'row' }}
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={{ xs: 1, xl: 5 }}
                            paddingBottom={2}>
                            <Stack
                                direction="column"
                                alignItems="flex-start"
                                justifyContent="space-around"
                                spacing={2}>
                                <TextField
                                    id="name"
                                    defaultValue={project.name}
                                    multiline
                                    inputRef={nameRef}
                                    InputProps={{
                                        readOnly: disabled,
                                        disableUnderline: disabled,
                                        style: { fontSize: 40, padding: 0 },

                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: disabled ? 1 : 'none' },
                                        "#name": { padding: 0 },
                                        padding: 0,
                                    }}
                                />
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <Typography variant="body1">Manager:</Typography>
                                    {
                                        !project.manager || !project.manager.deleted ?
                                            getUserChip(project.manager, props.removeManager, props.setManager, !disabled) :
                                            getUserChip(undefined, props.removeManager, props.setManager, !disabled)
                                    }

                                </Stack>
                            </Stack>
                            <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="space-evenly"
                                minWidth={150}
                                spacing={1}>
                                <Stack direction={'row'}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}>
                                    <Typography variant="body1">
                                        From:
                                    </Typography>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        id="start-date"
                                        disabled={disabled}
                                        dateFormat={"dd.MM.yyyy"}
                                    />
                                </Stack>
                                <Stack direction={'row'}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}>
                                    <Typography variant="body1">
                                        To:
                                    </Typography>
                                    <DatePicker
                                        selected={deadline}
                                        onChange={(date: Date) => setDeadline(date)}
                                        id="end-date"
                                        disabled={disabled}
                                        dateFormat={"dd.MM.yyyy"}
                                    />
                                </Stack>
                            </Stack>
                            <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="space-evenly"
                                minWidth={250}
                                spacing={2}>
                                <Stack width="100%" direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                    <Typography>State</Typography>
                                    {!project.projectState || project.projectState.deleted ?
                                        props.showEditButton ?
                                            <Chip
                                                key={"plus"}
                                                label={
                                                    <AddIcon style={{ color: "white" }} />
                                                }

                                                onClick={props.setState}
                                                id={"plus"}
                                                color="primary"
                                                clickable={props.showEditButton}
                                                variant={props.showEditButton ? "filled" : "outlined"}
                                                style={{ minWidth: 100 }}
                                            /> : <React.Fragment />
                                        :
                                        getLabels(project.projectState, props.setState, !disabled)
                                    }
                                </Stack>
                                <Stack width="100%" direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                    <Typography>Category</Typography>
                                    {!project.projectType || project.projectType.deleted ?
                                        props.showEditButton ?
                                            <Chip
                                                key={"plus"}
                                                label={
                                                    <AddIcon style={{ color: "white" }} />
                                                }

                                                onClick={() => {
                                                    if (!disabled)
                                                        props.setCategory()
                                                }}
                                                id={"plus"}
                                                color="primary"
                                                clickable={!disabled}
                                                variant={!disabled ? "filled" : "outlined"}
                                                style={{ minWidth: 100 }}
                                            /> : <React.Fragment />
                                        :
                                        getLabels(project.projectType, props.setCategory, !disabled)}
                                </Stack>

                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={1} alignItems="center" mb={2} mt={1}>
                            <Typography variant="body1">Channels:</Typography>
                            {project.channels.filter(val => !val.deleted).length === 0 ?
                                props.showEditButton ?
                                    <Chip
                                        key={"plus"}
                                        label={
                                            <AddIcon style={{ color: "white" }} />
                                        }
                                        onClick={() => {
                                            if (!disabled) props.setChannels()
                                        }}
                                        id={"plus"}
                                        color="primary"
                                        clickable={!disabled}
                                        variant={!disabled ? "filled" : "outlined"}
                                        style={{ minWidth: 100 }}
                                    /> : <React.Fragment />
                                :
                                Array.from(project.channels.filter(val => !val.deleted)).map((value: any) => (
                                    getLabels(value, props.setChannels, !disabled)
                                ))
                            }
                        </Stack>
                        <Stack direction={'row'} spacing={1} alignItems="center">
                            <Typography variant="body1">Time spent:</Typography>
                            <Typography variant="body1">{toHHMMSS(props.timeSpent)}</Typography>
                        </Stack>
                    </Grid>
                    {props.showEditButton ?
                        <Grid item xl={1}>
                            <Stack>
                                <IconButton aria-label="edit" onClick={() => {
                                    props.deleteData(project.id)
                                }}>
                                    <DeleteIcon color="primary" />
                                </IconButton>
                                {
                                    disabled ?
                                        <IconButton aria-label="edit" onClick={() => {
                                            setDisabled(false)
                                        }}>
                                            <EditIcon color="primary" />
                                        </IconButton>

                                        :
                                        <IconButton aria-label="save" onClick={handleSave}>
                                            <SaveIcon color="primary" />
                                        </IconButton>
                                }

                            </Stack>
                        </Grid> : <React.Fragment />
                    }
                </Grid>

            </Box>
            {
                props.showDescription ?
                    <React.Fragment>
                        <Divider variant="middle" />
                        <Box sx={{ my: 3, mx: 2, mb: 1, p: 2 }}>
                            <TextField
                                id="description"
                                defaultValue={project.description}
                                inputRef={descRef}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                                variant="outlined"
                                sx={{
                                    "& fieldset": { border: !disabled ? 1 : 'none' },
                                    padding: 0,
                                    marginBottom: 1
                                }}
                                multiline
                                fullWidth
                            />
                        </Box>
                    </React.Fragment> : <React.Fragment></React.Fragment>
            }
        </Paper>)
}