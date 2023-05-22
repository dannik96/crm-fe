import PostTable from "@/components/channels/posts/PostTable";
import AddLabelDialog from "@/components/customs/AddLabelDialog";
import ChannelTypesTable from "@/components/labels/ChannelTypesTable";
import EventTypeTable from "@/components/labels/EventTypeTable";
import PostStateTable from "@/components/labels/PostStatesTable";
import ProjectLabelTable from "@/components/labels/ProjectLabelTable";
import ProjectStatesTable from "@/components/labels/ProjectStatesTable";
import TaskLabelsTable from "@/components/labels/TaskLabelsTable";
import TaskStatesTable from "@/components/labels/TaskStatesTable";
import { EventTableColumns, EventTableOptions } from "@/data/headers/Events";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";


export default function Labels(props: any) {

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xs={12} sx={{ mx: 2 }}>
                <Typography variant="h3">States</Typography>
            </Grid>
            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostStateTable />
                </Paper>
            </Grid>
            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <ProjectStatesTable/>
                </Paper>
            </Grid>
            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <TaskStatesTable />
                </Paper>
            </Grid>

            <Grid item xs={12} sx={{ mx: 2 }}>
                <Typography variant="h3">Labels and types</Typography>
            </Grid>
            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <ChannelTypesTable />
                </Paper>
            </Grid>
            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <TaskLabelsTable />
                </Paper>
            </Grid>
            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <ProjectLabelTable />
                </Paper>
            </Grid>

            <Grid item xl={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <EventTypeTable />
                </Paper>
            </Grid>
        </Grid>)
}