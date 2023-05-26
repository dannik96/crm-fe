import NewTaskPaper from "@/components/projects/tasks/NewTaskPaper";
import TaskPaper from "@/components/tasks/TaskPaper";
import { getData } from "@/util/communicationUtil";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";


export default function TaskPage(props: any) {

    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getData(setTasks, router, "/api/task/");
    }, [router])

    return (
        <Grid container padding={4} spacing={3}>
            <NewTaskPaper />
            {tasks ?
                Array.from(tasks).map((value) => (
                    <TaskPaper key={value.id} task={value} />
                ))
                : <React.Fragment />
            }
        </Grid>)
}