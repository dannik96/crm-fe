import { Grid, Paper, Box, Typography, Divider, TextField, Stack, Chip, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import React from "react";
import LabelDialog from "../customs/LabelDialog";

function getTypes(label: any, addHandler: Function) {
    const handleClick = () => {
        addHandler(label.id)
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

export default function AudiencePaper(props: any) {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(props.data);
    const [channelsOpen, setChannelsOpen] = useState(false);
   
    const handleSave = (props: any) => {
        setEditMode(false);
    }

    async function updateChannels(value: any) {
        let addArr = [];
        let delArr = [];
        let res: any;
        for (let i = 0; i < value.length; i++) {
            if (!data.channels.includes(value[i])) {
                addArr.push(value[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + value[i].id + "/add-audience/" + data.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < data.channels.length; i++) {
            if (!value.includes(data.channels[i])) {
                delArr.push(data.channels[i]);
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/` + data.channels[i].id + "/remove-audience/" + data.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if ((delArr.length !== 0 || addArr.length != 0) && res.ok) {
            const copy = { ...data, channels: value }
            setData(copy)
        }
        setChannelsOpen(false);
    }


    return (<Grid item xs={12} md={4} lg={4}>
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {channelsOpen ? <LabelDialog
                open={channelsOpen}
                onClose={() => setChannelsOpen(false)}
                onSave={(selectedValues: any) => updateChannels(selectedValues)}
                selectedValue={data.channels}
                choices={props.channels} /> : <React.Fragment />}
            <Box sx={{ my: 3, mx: 2, mb: 1 }} paddingBottom={1}>
                <Grid container alignItems="center" columnSpacing={2} paddingBottom={1}>
                    <Grid item xs={11}>
                        <TextField
                            id="name"
                            defaultValue={data.name}
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
                            multiline
                        />
                    </Grid>
                    <Grid item xs={1}>

                        <IconButton aria-label="delete" onClick={() => props.deleteData(data)}>
                            <DeleteIcon color="primary" />
                        </IconButton>
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
                    </Grid>
                </Grid>
                <Stack direction="row" spacing={1} alignItems={'center'} flexWrap={'wrap'} useFlexGap>
                    <Typography variant="body1" paddingRight={1}>Channels: </Typography>
                    {
                        data.channels.filter(val => !val.deleted).length !== 0 ?

                            Array.from(data.channels.filter(val => !val.deleted)).map((value) => (
                                getTypes(value, () => setChannelsOpen(true))
                            ))
                            : <Chip
                                key={"plus"}
                                label={
                                    <AddIcon style={{ color: "white" }} />
                                }

                                onClick={() => setChannelsOpen(true)}
                                id={"plus"}
                                color="primary"
                                clickable={props.showEditButton}
                                variant={props.showEditButton ? "filled" : "outlined"}
                                style={{ minWidth: 100 }}
                            />
                    }
                </Stack>
            </Box>
            <Divider variant="middle" sx={{ marginBottom: 2 }} />
            <Box sx={{ mx: 2 }}>
                <TextField
                    id="description"
                    defaultValue={data.description}
                    InputProps={{
                        readOnly: editMode ? false : true,
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
        </Paper>
    </Grid>);
}