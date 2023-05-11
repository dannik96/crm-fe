import { options } from "@/util/options";
import { Box, Button, Chip, Divider, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

let data = {
    name: "Tootbrush",
    tasks: 12,
    manager: "Manager",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam commodo dui eget wisi. Curabitur bibendum justo non orci. Integer lacinia. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Nulla pulvinar eleifend sem. Curabitur sagittis hendrerit ante. Nullam sit amet magna in magna gravida vehicula. Morbi scelerisque luctus velit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Cras elementum. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.",
    created: "2.2.2023",
    deadline: "2.2.2024",
    state: "Open",
    category: "Hiring"
}

export default function ProjectPaper(props: any) {
    const project = props.project;
    console.log(project)
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
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h3" component="div">
                                    {project.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography gutterBottom variant="h6" component="div">
                                    !!
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {project.manager.name + " " + project.manager.surname}
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
                                    defaultValue={new Date(project.created).toLocaleDateString("cs-CS")}
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
                                    defaultValue={project.projectState.name}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-read-only-input"
                                    label="Category"
                                    defaultValue={project.projectType.name}
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

