import { Box, Chip, Divider, Grid, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";

export default function TaskPaper(props: any) {
    const task = props.task;
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Link href={"/projects/tasks/" + task.id} style={{ textDecoration: 'none' }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ my: 3, mx: 2, mb: 1 }}>
                        <Grid container alignItems="baseline" columnSpacing={2}>
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h3" component="div">
                                    {task.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Icon>
                                    <VisibilityIcon color="primary" />
                                </Icon>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {task.assignedPerson ? task.assignedPerson.name + " " + task.assignedPerson.surname : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ m: 2 }}>
                        <Stack direction={'column'} spacing={1}>
                            <TextField
                                id="standard-read-only-input"
                                label="Project"
                                defaultValue={task.project? task.project.name : ""}
                                InputProps={{
                                    readOnly: true,
                                    disableUnderline: true
                                }}
                                variant="standard"
                            />
                            <Stack direction="row" spacing={1} flexWrap={'wrap'} alignItems={'center'} useFlexGap>

                                <Typography variant="body1">State</Typography>
                                {
                                    !task.taskState || task.taskState.deleted ? <React.Fragment></React.Fragment> :
                                        <Chip
                                            label={task.taskState.name}
                                            variant="outlined"
                                            color="primary"
                                        />
                                }
                            </Stack>
                            <Stack direction="row" spacing={1} flexWrap={'wrap'} alignItems={'center'} useFlexGap>
                                <Typography variant="body1">Labels</Typography>
                                {Array.from(task.taskLabels.filter((taskLabel : any) => !taskLabel.deleted)).map((value) => (
                                    <Chip
                                        label={value.name}
                                        key={value.id}
                                        variant="outlined"
                                        color="primary"
                                    />
                                ))}
                            </Stack>
                            <TextField
                                id="standard-read-only-input"
                                label="Deadline"
                                defaultValue={task.deadline ? new Date(task.deadline).toLocaleDateString() : " "}
                                InputProps={{
                                    readOnly: true,
                                    disableUnderline: true
                                }}
                                variant="standard"
                            />
                        </Stack>
                    </Box>
                    <Box sx={{ mx: 2 }}>
                        <Grid container>
                            <Grid item>
                                <Typography variant="body1">
                                    {task.description.length > 150 ? task.description.substring(0, 147) + "..." : task.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Link>
        </Grid>)
}