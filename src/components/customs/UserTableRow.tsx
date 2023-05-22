import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LabelDialog from "../customs/LabelDialog";
import AddIcon from '@mui/icons-material/Add';
import SimpleDialog from "../customs/SimpleDialog";
import { getData } from "@/util/communicationUtil";
import { useRouter } from "next/router";


function getLabels(label: any, addHandler: Function, editable: boolean) {
    const handleClick = () => {
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

function getProjectChip(project: any, unnassigneHandler: Function, changeAssignee: Function) {

    const handleDeleteAssignee = () => {
        unnassigneHandler(undefined);
    }

    const handleClick = () => {
        changeAssignee()
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

export default function UserTableRow(props: any) {
    const [user, setUser] = useState();
    const [editMode, setEditMode] = useState(false);
    const [fetchedRoles, setFetchedRoles] = useState([]);
    const [roleOpen, setRoleOpen] = useState(false);
    const [roles, setRoles] = useState([]);

    const usernameRef = useRef();
    const surnameRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const router = useRouter();

    useEffect(() => {
        getData(setUser, router, "/api/user/" + props.rowData[0]);
        getData(setFetchedRoles, router, "/api/user/user-roles" + props.rowData[0]);
    }, [])

    async function fetchUserRoles() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/user-roles`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            setFetchedRoles(json)
        }
    }

    const handleRoleClickOpen = () => {
        if (editMode)
            setRoleOpen(true);
    }

    async function handleRolesChange(values) {
        const newValues = values;
        setUser({
            ...user,
            roles: values
        })
        setRoleOpen(false)
    }

    async function handleSave() {
        saveRoles();
        user.username = usernameRef.current.value;
        user.email = emailRef.current.value;
        user.person.name = nameRef.current.value;
        user.person.surname = surnameRef.current.value;
        user.person.email = emailRef.current.value;
        user.person.login = usernameRef.current.value;
        user.person.phone = phoneRef.current.value;
        props.updateHandler(user)
    }

    async function saveRoles() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/` + user.id + '/set-roles', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(user.roles)
        })
    }

    return (
        <TableRow>
            {user ?
                <TableCell colSpan={props.rowData.length + 1}>
                    <Grid container>
                        <Grid item xs={11}>
                            <Stack direction={'column'} spacing={2}>
                                <TextField
                                    id="name"
                                    label="Username"
                                    defaultValue={user.username}
                                    inputRef={usernameRef}
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
                                    id="name"
                                    label="Name"
                                    defaultValue={user.email}
                                    inputRef={emailRef}
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
                                <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                    <Typography variant="body1">Type: </Typography>
                                    {
                                        user.roles.filter((eventType: any) => !eventType.deleted).length !== 0 ?
                                            Array.from(user.roles.filter(role => !role.deleted)).map((value: any) => (
                                                getLabels(value, handleRoleClickOpen, editMode)
                                            ))
                                            : <Chip
                                                key={"plus"}
                                                label={
                                                    <AddIcon style={{ color: editMode ? "white" : "#1976d2" }} />
                                                }
                                                onClick={handleRoleClickOpen}
                                                id={"plus"}
                                                color="primary"
                                                clickable={editMode}
                                                variant={editMode ? "filled" : "outlined"}
                                                style={{ minWidth: 100 }}
                                            />
                                    }
                                    {fetchedRoles ?
                                        <LabelDialog
                                            open={roleOpen}
                                            onClose={() => setRoleOpen(false)}
                                            onSave={(selectedValues: any) => handleRolesChange(selectedValues)}
                                            selectedValue={user.roles}
                                            choices={fetchedRoles} /> : <React.Fragment />}
                                </Stack>
                                <TextField
                                    id="name"
                                    label="Name"
                                    defaultValue={user.person.name}
                                    inputRef={nameRef}
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
                                    id="name"
                                    label="Surname"
                                    defaultValue={user.person.surname}
                                    inputRef={surnameRef}
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
                                    id="name"
                                    label="Phone"
                                    defaultValue={user.person.phone}
                                    inputRef={phoneRef}
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
                            </Stack>

                        </Grid>

                        <Grid item xs={1}>
                            <Stack direction={'column'}>
                                <Button variant={'contained'} color="error" aria-label="deactivate" onClick={() => {
                                    props.deleteData(user)
                                }}>
                                    Deactivate
                                </Button>
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
                            </Stack>
                        </Grid>
                    </Grid>
                </TableCell>
                : <React.Fragment />}
        </TableRow>
    );
}