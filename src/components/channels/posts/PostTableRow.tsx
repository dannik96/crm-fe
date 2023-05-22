import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import SimpleDialog from "@/components/customs/SimpleDialog";
import LabelDialog from "@/components/customs/LabelDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getData } from "@/util/communicationUtil";
import { useRouter } from "next/router";


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
            label={state ? state.name : ""}
            variant={editMode ? "filled" : "outlined"}
            color="primary"
            clickable={editMode}
            onClick={handleClick} />
    )
}

export default function PostTableRow(props: any) {
    const [post, setPost] = useState(undefined);
    const [channels, setChannels] = useState([]);
    const [postStates, setPostStates] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [channelOpen, setChannelOpen] = useState(false);
    const [postStateOpen, setPostStateOpen] = useState(false);
    const nameRef = useRef();
    const contRef = useRef();
    const router = useRouter();

    useEffect(() => {
        getData(setPost, router, "/api/post/" + props.rowData[0])
        getData(setPostStates, router, "/api/post-state" )
        getData(setChannels, router, "/api/channel/")
    }, [])

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
            props.updateHandler(json);
        }
    }

    const deleteData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/` + post.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.ok) {
            props.deleteData(post);
        }
    }

    const handleUpdateState = (id: any) => {
        if (editMode)
            setPostStateOpen(true);
    }


    let isClearable = {
        isClearable: editMode
    }

    const handleChannelClickOpen = () => {
        if (editMode)
            setChannelOpen(true);
    };

    const handleChannelChange = async (value: any[]) => {
        let addArr = [];
        let delArr = [];
        let res: any;
        for (let i = 0; i < value.length; i++) {
            if (!post.channels.includes(value[i])) {
                addArr.push(value[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/` + post.id + "/add-channel/" + value[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < post.channels.length; i++) {
            if (!value.includes(post.channels[i])) {
                delArr.push(post.channels[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/` + post.id + "/remove-channel/" + post.channels[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if (res.ok) {
            setPost({
                ...post,
                channels: value
            })
        }
        setChannelOpen(false);
    };

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
                                    <Typography variant="body1">Channels: </Typography>
                                    {
                                        post.channels.length !== 0 ?
                                            Array.from(post.channels).map((value: any) => (
                                                getLabels(value, handleChannelClickOpen, editMode)
                                            ))
                                            : <Chip
                                                key={"plus"}
                                                label={
                                                    <AddIcon style={{ color: editMode ? "white" : "#1976d2" }} />
                                                }
                                                onClick={() => handleChannelClickOpen()}
                                                id={"plus"}
                                                color="primary"
                                                clickable={editMode}
                                                variant={editMode ? "filled" : "outlined"}
                                                style={{ minWidth: 100 }}
                                            />
                                    }
                                    {channels ?
                                        <LabelDialog
                                            open={channelOpen}
                                            onClose={() => setChannelOpen(false)}
                                            onSave={(selectedValues: any) => handleChannelChange(selectedValues)}
                                            selectedValue={post.channels}
                                            choices={channels} /> : <React.Fragment />}
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={1}>
                            <Stack direction={'column'}>
                                    <IconButton aria-label="edit" onClick={() => {
                                        deleteData()
                                    }}>
                                        <DeleteIcon color="primary" />
                                    </IconButton>
                                {
                                    editMode ?
                                        <IconButton aria-label="delete" onClick={handleSave}>
                                            <SaveIcon color="primary" />
                                        </IconButton> :
                                        <IconButton aria-label="delete" onClick={() => {
                                            setEditMode(true)
                                        }}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                }
                            </Stack>
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