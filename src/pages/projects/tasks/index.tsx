import ProjectPaper from "@/components/projects/ProjectPaper";
import TaskPaper from "@/components/tasks/TaskPaper";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";


export default function TaskPage(props: any) {

    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchTasks();
    }, [router])

    async function fetchTasks() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setTasks(json)
        }
    }

    return (
        <Grid container padding={4} spacing={3}>
            {tasks ?
                Array.from(tasks).map((value) => (
                    <TaskPaper task={value} />
                ))
                : <React.Fragment />
            }
        </Grid>)
}