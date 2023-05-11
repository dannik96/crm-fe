import { Paper, Box, Grid, Stack, Divider, Typography, TextField, Chip, IconButton, Avatar } from "@mui/material";
import LabelData from "../customs/LabelData";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Padding } from "@mui/icons-material";

function getLabels(label: any, addHandler: Function, removeHandler: Function, showEditButton: boolean) {
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
            id={label}
            color="primary"
            clickable={showEditButton}
            variant={showEditButton ? "filled" : "outlined"}
            style={{ minWidth: 100 }}
        />);
}

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function, showEditButton: boolean) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(user.id);
    }

    const handleClick = () => {
        changeAssignee(user.id)
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
    const [disabled, setDisabled] = useState(true);

    const project = props.project;
    console.log("render project detail")
    console.log(project);

    const handleAddLabels = (id: any) => {
        console.log(id);
    }


    const handleSave = (props: any) => {
        setDisabled(true);
        console.log(props);
    }

    const handleRemoveLabels = (id: any) => {
        //props.updateLabels(labels);
    }
    const handleDeleteAssignee = (props: any) => {
        console.log("delete");
        console.log(props);
        //setAssignee(undefined)
    }

    const handleChangeAssigne = (props: any) => {
        console.log("chenge assignee");
        console.log(props);
    }

    return (<Paper
        sx={{
            p: 2,
            display: 'flex',
            maxWidth: '100%',
            flexDirection: 'column',
        }}>
        <Box sx={{ my: 3, mx: 2, mb: 3 }}>
            <Grid container>
                <Grid item xl={11}>
                    <Stack
                        direction={{ xs: 'column', xl: 'row' }}
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={{ xs: 1, xl: 5 }}>
                        <Stack
                            direction="column"
                            alignItems="flex-start"
                            justifyContent="space-around"
                            spacing={2}>
                            <TextField
                                id="name"
                                defaultValue={project.name}
                                multiline
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
                            {getUserChip(project.manager, handleDeleteAssignee, handleChangeAssigne, props.showEditButton)}


                        </Stack>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="space-evenly"
                            minWidth={150}
                            spacing={1}>
                            <TextField
                                id="standard-read-only-input"
                                label="From"
                                InputProps={{
                                    readOnly: disabled,
                                    disableUnderline: disabled
                                }}
                                variant="standard"
                                defaultValue={new Date(project.start).toLocaleDateString("cs-CS")}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="To"
                                InputProps={{
                                    readOnly: disabled,
                                    disableUnderline: disabled
                                }}
                                variant="standard"
                                defaultValue={new Date(project.deadline).toLocaleDateString("cs-CS")}
                            />
                        </Stack>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="space-evenly"
                            minWidth={250}
                            spacing={2}>
                            <Stack width="100%" direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography>State</Typography>
                                {getLabels(project.projectState, handleAddLabels, handleRemoveLabels, props.showEditButton)}
                            </Stack>
                            <Stack width="100%" direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography>Category</Typography>
                                {getLabels(project.projectType, handleAddLabels, handleRemoveLabels, props.showEditButton)}
                            </Stack>

                        </Stack>
                    </Stack>
                </Grid>
                {props.showEditButton ?
                    <Grid item xl={1}>
                        {
                            disabled ?
                                <IconButton aria-label="edit" onClick={() => {
                                    console.log("edit mode");
                                    setDisabled(false)
                                }}>
                                    <EditIcon color="primary" />
                                </IconButton>

                                :
                                <IconButton aria-label="save" onClick={handleSave}>
                                    <SaveIcon color="primary" />
                                </IconButton>
                        }
                    </Grid> : <React.Fragment />
                }
            </Grid>

        </Box>
        {
            props.showDescription ?
                <React.Fragment>
                    <Divider variant="middle" />
                    <Box sx={{ my: 3, mx: 2, mb: 1, p: 2 }}>
                        <Typography>{project.description}</Typography>
                    </Box>
                </React.Fragment> : <React.Fragment></React.Fragment>
        }
    </Paper>)
}