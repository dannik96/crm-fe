import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import SimpleDialog from "@/components/customs/SimpleDialog";
import LabelDialog from "@/components/customs/LabelDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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

function getStateChip(state: any, changeState: Function, editMode: boolean) {

    const handleClick = () => {
        changeState()
    }

    return (
        <Chip
            style={{ minWidth: 100 }}
            id={state ? state.id : -1}
            label={state? state.name : ""}
            variant={editMode ? "filled" : "outlined"}
            color="primary"
            clickable={editMode}
            onClick={handleClick} />
    )
}

export default function PostTableRow(props: any) {
    console.log(props.rowData)
    const [post, setPost] = useState(undefined);
    const [postStates, setPostStates] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [taskOpen, setTaskOpen] = useState(false);
    const [postStateOpen, setPostStateOpen] = useState(false);
    const nameRef = useRef();
    const contRef = useRef();
    console.log(post)
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

    const handlePostStateChange = async (value: any) => {
        setPostStateOpen(false);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/` + post.id + "/set-state/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const newPost = { ...post, postState: value }
            setPost(newPost);
        }
    }

    const handleSave = async (params: any) => {
        setEditMode(false);
        post.content = contRef.current.value;
        post.name = nameRef.current.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(post)
        })
        if (res.ok) {
            const json = await res.json()
            console.log(json)
            props.updateHandler(json);
        }
    }

    // TODO
    const handleAddLabels = (id: any) => {

        console.log(id);
    }
    const handleUpdateState = (id: any) => {
        if (editMode)
            setPostStateOpen(true);
    }

    // TODO
    const handleAddTask = (id: any) => {
        setTaskOpen(true);
    }

    let isClearable = {
        isClearable : editMode
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
                                    inputRef={nameRef}
                                />
                                <Stack direction={'row'}
                                    alignItems="center"
                                    spacing={1}>
                                    <Typography variant="body1">
                                        Post date:
                                    </Typography>
                                    <DatePicker
                                        selected={new Date(post.postDate)}
                                        onChange={(date: Date) => setPost({ ...post, postDate: date })}
                                        id="end-date"
                                        disabled={!editMode}
                                        showTimeSelect
                                        {...isClearable}
                                        dateFormat={"dd.MM.yyyy"}
                                    />
                                </Stack>

                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography>State: </Typography>
                                    {getStateChip(post.postState, handleUpdateState, editMode)}
                                    {postStates ?
                                        <SimpleDialog
                                            open={postStateOpen}
                                            onClose={() => setPostStateOpen(false)}
                                            onItemClick={handlePostStateChange}
                                            choices={postStates} /> : <React.Fragment />}
                                </Stack>
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
                                        getLabels(value, handleAddTask, editMode)
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
                    <TextField
                            id="description"
                            defaultValue={post.content}
                            inputRef={contRef}
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