import { Grid, Paper, Box, Typography, Divider, TextField, Stack, Chip, IconButton } from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";

export default function AudiencePaper(props: any) {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(props.data);
    console.log(data)

    const handleSave = (props: any) => {
        setEditMode(false);
        console.log(props)
    }

    return (<Grid item xs={12} md={4} lg={4}>
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
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
                    {Array.from(data.channels).map((value, index) => (
                        <Chip
                            label={value.name}
                            key={value.id}
                        />
                    ))}
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