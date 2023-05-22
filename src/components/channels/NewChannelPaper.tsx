import { Avatar, Chip, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import SimpleDialog from "../customs/SimpleDialog";
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

export default function NewChannelPaper(props: any) {
    const router = useRouter();
    const nameRef = useRef();
    const locRef = useRef();
    const descRef = useRef();
    const [audiences, setAudiences] = useState([])
    const [types, setTypes] = useState([])

    const [audienceOpen, setAudienceOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);

    const [fetchedAudiences, setFetchedAudiences] = useState([]);
    const [fetchedTypes, setFetchedTypes] = useState([]);

    useEffect(() => {
        getData(setFetchedAudiences, router, "/api/audience/");
        getData(setFetchedTypes, router, "/api/channel-type/");
    }, [])

    const saveData = async () => {
        console.log("create")
        const createdChannel = await createProject();
        console.log(createdChannel)

        for (let index = 0; index < audiences.length; index++) {
            const element = audiences[index];
            console.log(element)
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + createdChannel.id + "/add-audience/" + element.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        }

        for (let index = 0; index < types.length; index++) {
            const element = types[index];
            console.log(element)
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + createdChannel.id + "/add-type/" + element.id, {
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
        const newChannel = {};
        newChannel.name = nameRef.current.value;
        newChannel.description = descRef.current.value;
        newChannel.location = locRef.current.value;
        console.log(newChannel)
        const per = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newChannel)
        })
        let createdProject;
        if (per.ok) {
            createdProject = await per.json();
            return createdProject;
        } else {
            console.log("nok");
            return undefined;
        }
    }

    const handleAudienceClose = (param: any) => {
        setAudiences(param);
        setAudienceOpen(false);
    }


    const handleTypesChange = (param: any) => {
        setTypes(param);
        setTypeOpen(false);
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
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Typography>Location:</Typography>
                        <TextField
                            id="name"
                            variant="standard"
                            defaultValue={""}
                            inputRef={locRef}>
                        </TextField>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={'center'}>
                        <Typography>
                            Audiences:
                        </Typography>
                        {audiences.length !== 0 ? Array.from(audiences).map(val =>
                            getLabels(val, setAudienceOpen))
                            : getLabels(undefined, setAudienceOpen)}
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems={'center'} useFlexGap flexWrap="wrap">
                        <Typography>
                            Types:
                        </Typography>
                        {types.length !== 0 ? Array.from(types).map(val =>
                            getLabels(val, setTypeOpen))
                            : getLabels(undefined, setTypeOpen)}
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
            {fetchedAudiences.length ?
                <LabelDialog
                    open={audienceOpen}
                    onSave={(selecedValues : any[]) => handleAudienceClose(selecedValues)}
                    selectedValue={audiences}
                    onClose={() => setAudienceOpen(false)}
                    choices={fetchedAudiences} /> : <React.Fragment />}
            {fetchedTypes ?
                <LabelDialog
                    open={typeOpen}
                    onSave={(selectedValues: any) => handleTypesChange(selectedValues)}
                    selectedValue={types}
                    onClose={() => setTypeOpen(false)}
                    choices={fetchedTypes} /> : <React.Fragment />}
        </Grid>)
}

