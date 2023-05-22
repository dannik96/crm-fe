import { Dialog, DialogTitle, FormGroup, FormControlLabel, Checkbox, Button, TextField, DialogContent, DialogActions, Stack, Typography, Chip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SimpleDialog from "./SimpleDialog";
import LabelDialog from "./LabelDialog";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddIcon from '@mui/icons-material/Add';
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

export default function AddEventDialog(props: any) {
    const { onClose, onSave, open, name } = props;
    const nameRef = useRef();
    const descRef = useRef();

    const [eventTypes, setEventTypes] = useState([]);
    const [project, setProject] = useState(undefined);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [labelOpen, setLabelOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [fetchedEventTypes, setFetchedEventTypes] = useState([]);
    const [projects, setProjects] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getData(setProjects, router, "/api/project/");
        getData(setFetchedEventTypes, router, "/api/event-type/");
    }, [])

    const handleSave = () => {
        const event = {};

        event.name = nameRef.current.value;
        event.description = descRef.current.value;
        event.eventTypes = eventTypes;
        event.project = project;
        event.endDate = endDate;
        event.startDate = startDate;

        onSave(event);
    }

    return (
        <Dialog onClose={onClose} open={open} fullWidth>
            <DialogTitle>New event</DialogTitle>
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
                            Start:
                        </Typography>
                        <DatePicker
                            selected={new Date(startDate)}
                            onChange={(date: Date) => setStartDate(date)}
                            id="end-date"
                            showTimeSelect
                            dateFormat={"dd.MM.yyyy"}
                        />
                    </Stack>
                    <Stack direction={'row'}
                        alignItems="center"
                        spacing={1}>
                        <Typography variant="body1">
                            End:
                        </Typography>
                        <DatePicker
                            selected={new Date(endDate)}
                            onChange={(date: Date) => setEndDate(date)}
                            id="end-date"
                            showTimeSelect
                            dateFormat={"dd.MM.yyyy"}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                        <Typography variant="body1">Type: </Typography>
                        {
                            eventTypes.length !== 0 ?
                                Array.from(eventTypes).map((value: any) => (
                                    getLabels(value, setLabelOpen)
                                ))
                                : <Chip
                                    key={"plus"}
                                    label={
                                        <AddIcon style={{ color: "white" }} />
                                    }
                                    onClick={() => setLabelOpen(true)}
                                    id={"plus"}
                                    color="primary"
                                    variant={"filled"}
                                    style={{ minWidth: 100 }}
                                />
                        }
                        {fetchedEventTypes ?
                            <LabelDialog
                                open={labelOpen}
                                onClose={() => setLabelOpen(false)}
                                onSave={(selectedValues: any) => {
                                    setEventTypes(selectedValues)
                                    setLabelOpen(false)
                                }}
                                selectedValue={eventTypes}
                                choices={fetchedEventTypes.filter((val) => !val.deleted)} /> : <React.Fragment />}
                    </Stack>
                    <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                        <Typography>Project: </Typography>
                        {getProjectChip(project, setProject, setProjectOpen)}
                        {projects ?
                            <SimpleDialog
                                open={projectOpen}
                                onClose={() => setProjectOpen(false)}
                                onItemClick={(value) => {setProject(value); setProjectOpen(false)}}
                                choices={projects} /> : <React.Fragment />}
                    </Stack>
                    <TextField
                        id="description"
                        label={"Description"}
                        defaultValue={""}
                        inputRef={descRef}
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