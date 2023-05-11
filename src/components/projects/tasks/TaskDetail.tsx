import LabelData from "@/components/customs/LabelData";
import { Paper, Box, Grid, Divider, Stack, Typography, Chip, Avatar, TextField, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function getLabels(label: any, addHandler: Function, removeHandler: Function, editable: boolean) {
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
            id={label.id}
            color="primary"
            clickable={editable}
            variant={editable ? "filled" : "outlined"}
            style={{ minWidth: 100 }}
        />);
}

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function, disabled: boolean) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(user.id);
    }

    const handleClick = () => {
        changeAssignee(user.id)
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
    const task = props.task;
    const [labels, setLabels] = useState(task.taskLabels);
    const [assignee, setAssignee] = useState(task.assignedPerson);
    const [disabled, setDisabled] = useState(true);
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
        setAssignee(undefined)
    }

    const handleChangeAssigne = (props: any) => {
        console.log("chenge assignee");
    }

    const handleSave = (props: any) => {
        setDisabled(true);
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
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: disabled ? 1 : 'none' },
                                        "#name": { padding: 0 },
                                        padding: 0,
                                    }}
                                />
                                <Link href={"/projects/projects/" + task.project.id} style={{ textDecoration: 'none' }}>
                                    <Typography variant="h6" component="div">{task.project.name}</Typography>
                                </Link>
                                {getUserChip(assignee, handleDeleteAssignee, handleChangeAssigne, props.showEditButton)}


                            </Stack>

                            <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="space-around"
                                minWidth={150}>
                                <TextField
                                    id="deadline"
                                    label="Deadline"
                                    defaultValue={new Date(task.deadline).toLocaleDateString()}
                                    InputProps={{
                                        readOnly: disabled,
                                        disableUnderline: disabled
                                    }}
                                    variant="standard"
                                />
                                <Stack width="100%" direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                    <Typography>State</Typography>
                                    {getLabels(task.state, handleAddLabels, handleRemoveLabels, props.showEditButton)}
                                </Stack>
                            </Stack>
                            <Stack direction={"row"} spacing={1} useFlexGap flexWrap="wrap">
                                {Array.from(labels).map((value: any) => (
                                    getLabels(value, handleAddLabels, handleRemoveLabels, props.showEditButton)
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>
                    {props.showEditButton ?
                        <Grid item xl={1}>
                            <Box display="flex" justifyContent="center">
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
                                <TextField
                                    id="description"
                                    defaultValue={task.description}
                                    InputProps={{
                                        readOnly: disabled,
                                        
                                    }}
                                    fullWidth
                                    multiline
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