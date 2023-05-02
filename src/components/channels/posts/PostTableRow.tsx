import { TableRow, TableCell, Grid, Stack, TextField, Box, IconButton, Divider, Typography, Chip, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
    const [labels, setLabels] = useState([{ id: 1, name: 'Channel 1' }, { id: 2, name: 'Channel 2' }, { id: 3, name: 'Channel 3' }]);
    const [tasks, setTasks] = useState([{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }, { id: 3, name: 'Task 3' }]);
    const [editMode, setEditMode] = useState(false);
    const [state, setState] = useState('Open');

    const handleChange = (event: SelectChangeEvent) => {
        setState(event.target.value);
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
        setLabels(labels.filter((label: { id: any; }) =>
            label.id !== id
        ))
    }

    // TODO
    const handleAddTask = (id: any) => {

        console.log(id);
    }
    const handleRemoveTask = (id: any) => {
        //props.updateLabels(labels);
        setTasks(tasks.filter((task: { id: any; }) =>
            task.id !== id
        ))
    }
    return (
        <TableRow>
            <TableCell colSpan={props.rowData.length}>
                <Grid container py={3} px={2}>
                    <Grid item xs={11}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                label="Name"
                                defaultValue={'Name'}
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
                                defaultValue={'14.04.2023'}
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
                                    value={state}
                                    label="State"
                                    onChange={handleChange}
                                    disableUnderline={editMode ? false : true}
                                    sx={{
                                        "& fieldset": { border: editMode ? 1 : 'none' },
                                        maxWidth: 250,
                                    }}
                                    disabled={!editMode}
                                >
                                    <MenuItem value={'Open'}>Open</MenuItem>
                                    <MenuItem value={'Closed'}>Closed</MenuItem>
                                    <MenuItem value={'Drafw'}>Draft</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="postDate"
                                label="Author"
                                defaultValue={'Name LongName'}
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
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                <Typography variant="body1">Channels: </Typography>
                                {Array.from(labels).map((value, index) => (
                                    getLabels(value, handleAddLabels, handleRemoveLabels)
                                ))}
                            </Stack>
                            <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                                <Typography variant="body1">Tasks: </Typography>
                                {Array.from(tasks).map((value, index) => (
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris elit massa, facilisis quis enim id, laoreet tincidunt lectus. Aliquam lorem magna, sollicitudin vel sem a, porta cursus lorem. Aenean elit arcu, euismod eu ullamcorper sed, viverra sit amet nibh. Maecenas fringilla sapien eu augue laoreet, at sodales lacus hendrerit. Vestibulum rhoncus non ante eu pharetra. Quisque egestas sem nisl, nec placerat ex auctor in. Pellentesque varius metus sed nunc finibus fermentum. Nunc dui ligula, ultricies nec ornare a, accumsan ac mauris. Aenean lectus massa, egestas laoreet tellus et, imperdiet tristique odio. In feugiat purus non efficitur efficitur. Donec condimentum eget purus scelerisque aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam nulla massa, blandit a tincidunt vitae, sodales eu leo. Vestibulum condimentum, orci nec semper vestibulum, elit magna ultrices nisl, eget scelerisque eros ipsum id ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

                        Ut commodo turpis id blandit auctor. Ut lorem libero, lobortis in ipsum nec, ultrices euismod magna. Phasellus id luctus risus. Quisque arcu mi, maximus sed malesuada eget, interdum quis sem. Nam ac turpis eget velit suscipit varius non non nisl. Mauris molestie viverra suscipit. Proin.
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
}