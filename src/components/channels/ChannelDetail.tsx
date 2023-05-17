import { Paper, Box, Grid, Stack, Divider, TextField, Typography, IconButton, Chip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import React, { useRef, useState } from "react";

function getTypes(label: any, addHandler: Function) {
    const handleClick = () => {
        addHandler()
    };

    return (
        <Chip
            label={label.name}
            onClick={handleClick}
            color="primary"
            id={label.id}
            key={label.id}
        />);
}

export default function ChannelDetail(props: any) {
    const channel = props.channel;
    const [types, setTypes] = useState(props.types);
    const [assignee, setAssignee] = useState(props.assignee);
    const [editMode, setEditMode] = useState(false);

    const nameRef = useRef();
    const locationRef = useRef();
    const descriptionRef = useRef();

    const handleSave = () => {
        setEditMode(false);
        const copy = channel;
        channel.name = nameRef.current.value;
        channel.location = locationRef.current.value;
        channel.description = descriptionRef.current.value;
        console.log(props)
        props.editChannel(channel);
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
                                    inputRef={nameRef}
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
                                    inputRef={locationRef}
                                    defaultValue={channel.location}
                                    InputProps={{
                                        readOnly: editMode ? false : true,
                                        disableUnderline: editMode ? false : true
                                    }}
                                    variant="standard"
                                />
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                {
                                    channel.channelTypes.length !== 0 ?

                                        Array.from(channel.channelTypes).map((value) => (
                                            getTypes(value, props.updateTypes)
                                        ))
                                        : <Chip
                                            key={"plus"}
                                            label={
                                                <AddIcon style={{ color: "white" }} />
                                            }

                                            onClick={props.updateTypes}
                                            id={"plus"}
                                            color="primary"
                                            clickable={props.showEditButton}
                                            variant={props.showEditButton ? "filled" : "outlined"}
                                            style={{ minWidth: 100 }}
                                        />
                                }
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
                            <TextField
                                id="description"
                                defaultValue={channel.description}
                                inputRef={descriptionRef}
                                InputProps={{
                                    readOnly: !editMode,
                                }}
                                fullWidth
                                multiline
                                variant="outlined"
                                sx={{
                                    "& fieldset": { border: !editMode ? 'none' : "1 px" },
                                }}
                            />
                        </Box>
                    </React.Fragment> : <React.Fragment></React.Fragment>
            }
        </Paper >)
}