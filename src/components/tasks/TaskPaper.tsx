import { Box, Button, Chip, Container, Divider, Grid, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from '@mui/icons-material/Visibility';

const data = {
    name: "Tootbrush",
    timeSpent: 12,
    assignee: "Manager",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam commodo dui eget wisi. Curabitur bibendum justo non orci. Integer lacinia. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Nulla pulvinar eleifend sem. Curabitur sagittis hendrerit ante. Nullam sit amet magna in magna gravida vehicula. Morbi scelerisque luctus velit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Cras elementum. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.",
    deadline: "2.2.2023",
    state: "Open",
    labels: ["Hiring", "Meeting", "Offline activity", "Offline activity", "Offline activity", "Offline activity"]
}


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
                                    <VisibilityIcon color="primary"/>
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
                                defaultValue={task.project.name}
                                InputProps={{
                                    readOnly: true,
                                    disableUnderline: true
                                }}
                                variant="standard"
                            />
                            <Stack direction="row" spacing={1} flexWrap={'wrap'} alignItems={'center'} useFlexGap>

                                <Typography variant="body1">State</Typography>
                                <Chip
                                    label={task.state.name}
                                    variant="outlined"
                                    color="primary"
                                />
                            </Stack>
                            <Stack direction="row" spacing={1} flexWrap={'wrap'} alignItems={'center'} useFlexGap>
                                <Typography variant="body1">Labels</Typography>
                                {Array.from(task.taskLabels).map((value) => (
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