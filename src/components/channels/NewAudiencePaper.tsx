import { Avatar, Chip, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import LabelDialog from "../customs/LabelDialog";
import { useRouter } from "next/router";
import AddIcon from '@mui/icons-material/Add';
import { getData } from "@/util/communicationUtil";

function getLabels(label: any, changeHandler: Function) {
    const handleClick = () => {
        changeHandler(true)
    };

    return (
        <Chip
            label={label ? label.name : <AddIcon style={{ color: "#1976d2" }} />}
            key={label ? label.id : ""}
            onClick={handleClick}
            color="primary"
            variant={label ? "filled" : "outlined"}
            style={{ minWidth: 100 }}
        />);
}

function getUserChip(user: any, unnassigneHandler: Function, changeAssignee: Function) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        changeAssignee(true)
    }

    return (
        <Chip
            style={{ minWidth: 100 }}
            label={user ? <Typography minWidth={50}>{user.name + " " + user.surname}</Typography> : <Typography minWidth={50}></Typography>}
            variant={user ? "filled" : "outlined"}
            color="primary"
            onClick={handleClick}
            onDelete={user ? handleDeleteAssignee : undefined}
            avatar={<Avatar>{user ? user.name.charAt(0) : ""}</Avatar>} />
    )
}

export default function NewAudiencePaper(props: any) {
    const router = useRouter();
    const nameRef = useRef();
    const descRef = useRef();
    const [channels, setChannels] = useState([])

    const [channelOpen, setChannelOpen] = useState(false);

    const [fetchedChannels, setFetchedChannels] = useState([]);

    useEffect(() => {
        getData(setFetchedChannels, router, "/api/channel/");
    }, [])

    const saveData = async () => {
        const createdAudience = await createProject();

        for (let index = 0; index < channels.length; index++) {
            const element = channels[index];
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + element.id + "/add-audience/" + createdAudience.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        }
        router.reload();
    }
    const createProject = async () => {
        const newAudience = {};
        newAudience.name = nameRef.current.value;
        newAudience.description = descRef.current.value;

        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/audience`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newAudience)
        })
        let createdAudience;
        if (per.ok) {
            createdAudience = await per.json();
            return createdAudience;
        } else {
            return undefined;
        }
    }

    const fetchChannels = async () => {
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (per.ok) {
            const res = await per.json();
            setFetchedChannels(res)
        }
    }

    const handleChannelClose = (param: any) => {
        setChannels(param);
        setChannelOpen(false);
    }


    return (
        <Grid item xs={12} md={4} lg={4}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack spacing={2} m={2}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Typography variant="body1">Name:</Typography>
                            <TextField
                                id="name"
                                variant="standard"
                                defaultValue={""}
                                inputRef={nameRef}>
                            </TextField>
                        </Stack>
                        <IconButton aria-label="save" onClick={saveData}>
                            <SaveIcon color="primary" />
                        </IconButton>
                    </Stack>
                    
                    <Stack direction={"row"} spacing={1} alignItems={'center'} useFlexGap flexWrap="wrap">
                        <Typography>
                            Channels:
                        </Typography>
                        {channels.length !== 0 ? Array.from(channels).map(val =>
                            getLabels(val, setChannelOpen))
                            : getLabels(undefined, setChannelOpen)}
                    </Stack>
                    <Typography>
                        Description:
                    </Typography>
                    <TextField
                        id="name"
                        variant="outlined"
                        multiline
                        fullWidth
                        minRows={4}
                        defaultValue={""}
                        inputRef={descRef} />
                </Stack>
            </Paper>
            {fetchedChannels.length ?
                <LabelDialog
                    open={channelOpen}
                    onSave={(selecedValues : any[]) => handleChannelClose(selecedValues)}
                    selectedValue={channels}
                    onClose={() => setChannelOpen(false)}
                    choices={fetchedChannels} /> : <React.Fragment />}
        </Grid>)
}

