import { Dialog, DialogTitle, FormGroup, FormControlLabel, Checkbox, Button, TextField, DialogContent, DialogActions, Stack, Typography, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from '@mui/icons-material/Add';
import LabelDialog from "@/components/customs/LabelDialog";
import SimpleDialog from "@/components/customs/SimpleDialog";
import { getData } from "@/util/communicationUtil";
import { useRouter } from "next/router";

function getLabels(label: any, addHandler: Function) {
    const handleClick = () => {
        addHandler(true)
    };

    return (
        <Chip
            key={label.id}
            label={label.name}
            onClick={handleClick}
            id={label.id}
            color="primary"
            variant={"filled"}
            style={{ minWidth: 100 }}
        />);
}

function getProjectChip(project: any, unnassigneHandler: Function, changeAssignee: Function) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        changeAssignee(true)
    }
    let deletable = {};
    if (project) {
        deletable = { onDelete: handleDeleteAssignee }
    }
    return (
        <Chip
            style={{ minWidth: 100 }}
            id={project ? project.id : -1}
            label={project ? <Typography minWidth={50}>{project.name}</Typography> : <AddIcon style={{ color: "white" }} />}
            variant={"filled"}
            color="primary"
            onClick={handleClick}
            {...deletable} />
    )
}

export default function AddPostDialog(props: any) {
    const { onClose, onSave, open } = props;
    const nameRef = useRef();
    const contRef = useRef();

    const [channels, setChannels] = useState([]);
    const [author, setAuthor] = useState(undefined);

    const [postDate, setPostDate] = useState(new Date());
    const [channelOpen, setChannelOpen] = useState(false);
    const [authorOpen, setAuthorOpen] = useState(false);
    const [fetchedChannels, setFetchedChannels] = useState([]);
    const [persons, setPersons] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getData(setPersons, router, "/api/person/");
        getData(setFetchedChannels, router, "/api/channel/");
    }, [])

    const handleSave = () => {
        const event = {};

        event.name = nameRef.current.value;
        event.description = contRef.current.value;
        event.channels = channels;
        event.author = author;
        event.postDate = postDate;

        onSave(event);
    }

    return (
        <Dialog onClose={onClose} open={open} fullWidth>
            <DialogTitle>New post</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField
                        id="name"
                        label="Name"
                        defaultValue={""}
                        inputRef={nameRef}
                        variant="standard"
                        sx={{
                            maxWidth: 250
                        }}
                    />
                    <Stack direction={'row'}
                        alignItems="center"
                        spacing={1}>
                        <Typography variant="body1">
                            Post date:
                        </Typography>
                        <DatePicker
                            selected={new Date(postDate)}
                            onChange={(date: Date) => setPostDate(date)}
                            id="post-date"
                            showTimeSelect
                            dateFormat={"dd.MM.yyyy"}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                        <Typography variant="body1">Channels: </Typography>
                        {
                            channels.length !== 0 ?
                                Array.from(channels).map((value: any) => (
                                    getLabels(value, setChannelOpen)
                                ))
                                : <Chip
                                    key={"plus"}
                                    label={
                                        <AddIcon style={{ color: "white" }} />
                                    }
                                    onClick={() => setChannelOpen(true)}
                                    id={"plus"}
                                    color="primary"
                                    variant={"filled"}
                                    style={{ minWidth: 100 }}
                                />
                        }
                        {fetchedChannels ?
                            <LabelDialog
                                open={channelOpen}
                                onClose={() => setChannelOpen(false)}
                                onSave={(selectedValues: any) => {
                                    setChannels(selectedValues)
                                    setChannelOpen(false)
                                }}
                                selectedValue={channels}
                                choices={fetchedChannels.filter((val) => !val.deleted)} /> : <React.Fragment />}
                    </Stack>
                    <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                        <Typography>Author: </Typography>
                        {getProjectChip(author, setAuthor, setAuthorOpen)}
                        {persons ?
                            <SimpleDialog
                                open={authorOpen}
                                onClose={() => setAuthorOpen(false)}
                                onItemClick={(value) => {setAuthor(value); setAuthorOpen(false)}}
                                choices={persons} /> : <React.Fragment />}
                    </Stack>
                    <TextField
                        id="content"
                        label={"Content"}
                        defaultValue={""}
                        inputRef={contRef}
                        variant="outlined"
                        sx={{
                            padding: 0,
                            marginBottom: 1
                        }}
                        multiline
                        fullWidth
                        minRows={4}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSave()}>
                    create
                </Button>
            </DialogActions>

        </Dialog>
    );
}