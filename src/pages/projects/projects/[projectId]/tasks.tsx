import PostTable from '@/components/channels/posts/PostTable';
import SimpleDialog from '@/components/customs/SimpleDialog';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { TaskTableColumns, TaskTableInterface } from '@/data/headers/Tasks';
import { getData } from '@/util/communicationUtil';
import { Button, Grid, Paper, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';


function DetailPage() {
    const router = useRouter();
    const [project, setProject] = useState();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (router.query.projectId === undefined) {
            return;
        }
        getData(setProject, router, "/api/project" + router.query.projectId)
        getData(setTasks, router, "/api/project" + router.query.projectId + "/tasks")
    }, [router])

    function modifyTasks(tasks: any[]) {
        let modifiedList: TaskTableInterface[] = [];
        for (let i = 0; i < tasks.length; i++) {
            modifiedList.push({
                id: tasks[i].id,
                name: tasks[i].name,
                deadline: tasks[i].deadline ? new Date(tasks[i].deadline).toLocaleDateString("cs-CS") : "",
                assignee: tasks[i].assignedPerson ? tasks[i].assignedPerson.name + " " + tasks[i].assignedPerson.surname : "",
                state: tasks[i].taskState ? tasks[i].taskState.name : ""
            })
        }
        
        return modifiedList;
    }

    const TaskTableOptions = {
        filter: true,
        selectableRows: "none",
        filterType: "dropdown",
        responsive: "simple",
        tableId: "Posts",
        pagination: false,
        elevation: 0,
        onRowClick: (rowData: any[], rowState: any[]) => {
            handleClick(rowData[0]);
        },
    };

    function handleClick(id: any) {
        router.push("/projects/tasks/" + id);
    }

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xl={12} xs={12}>
                <Stack spacing={3}>
                    {project === undefined ? <React.Fragment></React.Fragment> : <ProjectDetail
                        project={project}
                        showDescription={false}
                        showEditButton={false} />}
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <PostTable data={modifyTasks(tasks)} columns={TaskTableColumns} options={TaskTableOptions} />
                        </Paper>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>);
}

export default DetailPage;


