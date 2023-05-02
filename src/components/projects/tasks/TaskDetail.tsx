import LabelData from "@/components/customs/LabelData";
import { Paper, Box, Grid, Divider, Stack, Typography, Chip, Avatar, TextField, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
        />);
}

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function) {

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
            label={user ? <Typography minWidth={50}>{user.name}</Typography> : <Typography minWidth={50}></Typography>}
            variant="outlined"
            color="primary"
            onClick={handleClick}
            onDelete={handleDeleteAssignee}
            avatar={<Avatar>{user ? user.name.charAt(0) : ""}</Avatar>} />
    )
}
const styles = {
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: 300,
        margin: 100,
        fontSize: 50 //??? Doesnt work
    }
}

export default function TaskDetail(props: any) {
    const [labels, setLabels] = useState(props.label);
    const [assignee, setAssignee] = useState(props.assignee);
    const [editMode, setEditMode] = useState(false);
    console.log(assignee)
    // TODO
    const handleAddLabels = (id: any) => {

        console.log(id);
    }
    const handleRemoveLabels = (id: any) => {
        //props.updateLabels(labels);
        setLabels(labels.filter((label: { id: any; }) =>
            label.id !== id
        ))
    }

    const handleDeleteAssignee = (props: any) => {
        console.log("delete");
        console.log(props);
        setAssignee(undefined)
    }

    const handleChangeAssigne = (props: any) => {
        console.log("chenge assignee");
        console.log(props);
    }

    const handleSave = (props: any) => {
        setEditMode(false);
        console.log(props)
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
                                minWidth={{ xl: 400, xs: 200 }}
                                spacing={1}>
                                <TextField
                                    id="name"
                                    defaultValue={props.name}
                                    InputProps={{
                                        readOnly: editMode ? false : true,
                                        disableUnderline: editMode ? false : true,
                                        style: { fontSize: 40 }
                                    }}

                                    variant="outlined"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                        padding: 0
                                    }}
                                />
                                <Stack sx={{ padding: "0 14px" }} direction="row" spacing={2}>
                                    <Link href={"/projects/projects/" + props.project.id} style={{ textDecoration: 'none' }}>
                                        <Typography variant="h6" component="div">{props.project.name}</Typography>
                                    </Link>
                                    {getUserChip(assignee, handleDeleteAssignee, handleChangeAssigne)}
                                </Stack>

                            </Stack>

                            <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="space-around"
                                minWidth={150}>
                                <TextField
                                    id="deadline"
                                    label="Deadline"
                                    defaultValue={props.deadline}
                                    InputProps={{
                                        readOnly: editMode ? false : true,
                                        disableUnderline: editMode ? false : true
                                    }}
                                    variant="outlined"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                    }}
                                />
                                <TextField
                                    id="state"
                                    label="State"
                                    defaultValue={props.state.name}
                                    InputProps={{
                                        readOnly: editMode ? false : true,
                                        disableUnderline: editMode ? false : true,
                                    }}
                                    variant="outlined"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                    }}
                                />
                            </Stack>
                            <Grid container spacing={{ md: 1, xs: 0 }} columns={{ xs: 4, sm: 4, md: 10 }}>
                                {Array.from(labels).map((value, index) => (
                                    <Grid item xs={2} sm={2} md={2} key={index}>
                                        {getLabels(value, handleAddLabels, handleRemoveLabels)}
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </Grid>
                    {props.showEditButton ?
                        <Grid item xl={1}>
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
                        </Grid> : <React.Fragment />
                    }
                </Grid>
            </Box>
            {
                props.showDescription ?
                    <React.Fragment>
                        <Divider variant="middle" />
                        <Box px={{ xl: 2, xs: 3 }}
                            py={{ xl: 2, xs: 2 }}>
                            <Typography>{props.description}</Typography>
                        </Box>
                    </React.Fragment> : <React.Fragment></React.Fragment>
            }
        </Paper >
    );
}