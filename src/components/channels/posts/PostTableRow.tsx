import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";

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

export default function PostTableRow(props: any) {
    console.log(props.rowData)
    const [post, setPost] = useState(undefined);
    const [postStates, setPostStates] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchPost();
        fetchPostStates();
    }, [])

    async function fetchPost() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/` + props.rowData[0], {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setPost(json)
        }
    }

    async function fetchPostStates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post-state`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setPostStates(json)
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
            {post ?
                <TableCell colSpan={props.rowData.length + 1}>
                    <Grid container py={3} px={2}>
                        <Grid item xs={11}>
                            <Stack spacing={2}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    defaultValue={post.name}
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
                                    id="postDate"
                                    label="Posting date"
                                    defaultValue={new Date(post.postDate).toLocaleDateString()}
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

                                <FormControl variant="standard" sx={{ minWidth: 80 }}>
                                    <InputLabel id="state-label">State</InputLabel>
                                    <Select
                                        labelId="state-label"
                                        id="state"
                                        value={post.postState.name}
                                        label="State"
                                        onChange={handleChange}
                                        disableUnderline={editMode ? false : true}
                                        sx={{
                                            "& fieldset": { border: editMode ? 1 : 'none' },
                                            maxWidth: 250,
                                        }}
                                        disabled={!editMode}
                                    >
                                        {Array.from(postStates).map(postState => {
                                            console.log(postState)
                                            return <MenuItem key={postState.id} value={postState.name}>{postState.name}</MenuItem>
                                        }
                                        )}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="postDate"
                                    label="Author"
                                    defaultValue={post.author ? post.author.name + " " + post.author.surname : ""}
                                    InputProps={{
                                        disabled: true,
                                        disableUnderline: true
                                    }}
                                    variant="standard"
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                        maxWidth: 250,
                                    }}
                                />
                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography variant="body1">Tasks: </Typography>
                                    {Array.from(post.tasks).map((value, index) => (
                                        getLabels(value, handleAddTask, handleRemoveTask)
                                    ))}
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
                            {post.content}
                        </Typography>
                    </Box>
                </TableCell> : <React.Fragment />
            }
        </TableRow>
    );
}