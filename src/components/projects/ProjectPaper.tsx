import { Box, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";


export default function ProjectPaper(props: any) {
    const project = props.project;
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Link href={"/projects/projects/" + project.id} style={{ textDecoration: 'none' }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ my: 3, mx: 2, mb: 1 }}>
                        <Grid container alignItems="center" columnSpacing={2}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h3" component="div">
                                    {project.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {project.manager? project.manager.name + " " + project.manager.surname : ""}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {project.tasks}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ m: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <TextField
                                    id="standard-read-only-input"
                                    label="Start date"
                                    defaultValue={new Date(project.start).toLocaleDateString("cs-CS")}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-read-only-input"
                                    label="End date"
                                    defaultValue={new Date(project.deadline).toLocaleDateString("cs-CS")}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <TextField
                                    id="standard-read-only-input"
                                    label="State"
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true
                                    }}
                                    variant="standard"
                                    defaultValue={project.projectState? project.projectState.name : ""}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-read-only-input"
                                    label="Category"
                                    defaultValue={project.projectType? project.projectType.name : ""}
                                    InputProps={{
                                        readOnly: true,
                                        disableUnderline: true
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mx: 2 }}>
                        <Grid container>
                            <Grid item>
                                <Typography variant="body1">
                                    {project.description.length > 150 ? project.description.substring(0, 147) + "..." : project.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Link>
        </Grid>)
}

