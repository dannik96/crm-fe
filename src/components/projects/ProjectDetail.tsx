import { Paper, Box, Grid, Stack, Divider, Typography } from "@mui/material";
import LabelData from "../customs/LabelData";
import React from "react";


export default function ProjectDetail(props: any) {
    return (<Paper
        sx={{
            p: 2,
            display: 'flex',
            maxWidth: '100%',
            flexDirection: 'column',
        }}>
        <Box sx={{ my: 3, mx: 2, mb: 3 }}>
            <Grid container>
                <Grid item xl={11}>
                    <Stack
                        direction={{ xs: 'column', xl: 'row' }}
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={{ xs: 1, xl: 5 }}>
                        <Stack
                            direction="column"
                            alignItems="flex-start"
                            justifyContent="flex-end">
                            <Typography variant="h3" component="div">{props.name}</Typography>
                            <Typography variant="h6" component="div">{props.manager}</Typography>
                        </Stack>

                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="space-around"
                            minWidth={150}>
                            <LabelData label="From" value={props.start}></LabelData>
                            <LabelData label="To" value={props.deadline}></LabelData>
                        </Stack>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="space-around"
                            minWidth={150}>
                            <LabelData label="State" value={props.state}></LabelData>
                            <LabelData label="Label" value={props.category}></LabelData>
                        </Stack>
                    </Stack>
                </Grid>
                {props.showEditButton ?
                    <Grid item xl={1}>
                        button
                    </Grid> : <React.Fragment />
                }
            </Grid>

        </Box>
        {
            props.showDescription ?
                <React.Fragment>
                    <Divider variant="middle" />
                    <Box sx={{ my: 3, mx: 2, mb: 1, p: 2 }}>
                        <Typography>{props.description}</Typography>
                    </Box>
                </React.Fragment> : <React.Fragment></React.Fragment>
        }
    </Paper>)
}