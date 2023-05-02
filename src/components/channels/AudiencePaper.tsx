import { Grid, Paper, Box, Typography, Divider, TextField, Stack, Chip, IconButton } from "@mui/material";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";

const data = {
    name: "Tootbrush",
    location: "Internet",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam commodo dui eget wisi. Curabitur bibendum justo non orci. Integer lacinia. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Nulla pulvinar eleifend sem. Curabitur sagittis hendrerit ante. Nullam sit amet magna in magna gravida vehicula. Morbi scelerisque luctus velit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Cras elementum. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.",
    types: ["Hiring", "Meeting", "Offline activity", "Offline activity", "Offline activity", "Offline activity"],
    numberOfPosts: 50
}

export default function ChannelPaper(props: any) {
    const [editMode, setEditMode] = useState(false);

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
                    {Array.from(data.types).map((value, index) => (
                        <Chip
                            label={value}
                            key={index}
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