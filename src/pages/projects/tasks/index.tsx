import ProjectPaper from "@/components/projects/ProjectPaper";
import TaskPaper from "@/components/tasks/TaskPaper";
import { Box, Grid } from "@mui/material";


export default function TaskPage(props: any) {
    return (
        <Grid container padding={4} spacing={3}>
            <TaskPaper></TaskPaper>
            <TaskPaper></TaskPaper>
            <TaskPaper></TaskPaper>
        </Grid>)
}