import { Paper, Box, Grid, Stack, Divider, TextField, Typography, IconButton, Chip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from "react";

function getTypes(label: any, index : any, addHandler: Function, removeHandler: Function) {
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
            key={index}
        />);
}

export default function ChannelDetail(props: any) {
    const channel = props.channel;
    const [types, setTypes] = useState(props.types);
    const [assignee, setAssignee] = useState(props.assignee);
    const [editMode, setEditMode] = useState(false);
    console.log(assignee)
    // TODO
    const handleAddTypes = (id: any) => {

        console.log(id);
    }
    const handleRemoveTypes = (id: any) => {
        //props.updateTypes(types);
        setTypes(types.filter((label: { id: any; }) =>
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
                            direction='column'
                            spacing={2}>
                            <Stack
                                direction="column"
                                alignItems="flex-start"
                                justifyContent="flex-around"
                                spacing={1}>
                                <TextField
                                    id="name"
                                    defaultValue={channel.name}
                                    InputProps={{
                                        readOnly: editMode ? false : true,
                                        disableUnderline: editMode ? false : true,
                                        style: { fontSize: 40 }
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                        padding: 0,
                                        marginBottom: 1
                                    }}
                                />
                                <TextField
                                    id="location"
                                    label="Location"
                                    defaultValue={channel.location}
                                    InputProps={{
                                        readOnly: editMode ? false : true,
                                        disableUnderline: editMode ? false : true
                                    }}
                                    variant="standard"
                                />
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                {Array.from(channel.channelTypes).map((value, index) => (
                                    getTypes(value, index, handleAddTypes, handleRemoveTypes) 
                                ))}
                            </Stack>
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
                            <Typography>{channel.description}</Typography>
                        </Box>
                    </React.Fragment> : <React.Fragment></React.Fragment>
            }
        </Paper >)
}