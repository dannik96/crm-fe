import LabelData from '@/components/customs/LabelData';
import Stats from '@/components/projects/Stats';
import { Avatar, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { blue } from '@mui/material/colors';

function DetailPage(props: any) {
    const [stateOpen, setStateOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [managerOpen, setManagerOpen] = useState(false);
    const [projectStates, setProjectStates] = useState();
    const [projectTypes, setProjectTypes] = useState();
    const [persons, setPersons] = useState();
    const [project, setProject] = useState();
    const router = useRouter();

    console.log("Project")
    useEffect(() => {
        fetchProject();
        fetchProjectStates();
        fetchProjectTypes();
        fetchPersons();
    }, [router])

    const handleStateClose = async (value: any) => {
        setStateOpen(false);
        console.log(value);
        if (value === undefined) {
            return;
        }
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + project.id + "/set-state/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setProject({ ...project, projectState: value });
        }
    };

    const handleTypeClose = async (value: any) => {
        setTypeOpen(false);
        console.log(value);
        if (value === undefined) {
            return;
        }
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + project.id + "/set-type/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setProject({ ...project, projectType: value });
        }
    };
    const handleManagerClose = async (value: any) => {
        setManagerOpen(false);
        console.log(value);
        if (router.query.projectId === undefined) {
            return;
        }

        if (value === undefined) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + project.id + "/unset-manager/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (res.ok) {
                setProject({ ...project, manager: value });
            }
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + project.id + "/set-manager/" + value.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setProject({ ...project, manager: value });
        }
    };
    async function fetchProjectStates() {
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project-state/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setProjectStates(json)
            console.log(json)
        }
    }

    async function fetchProjectTypes() {
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project-type/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setProjectTypes(json)
            console.log(json)
        }
    }

    async function fetchPersons() {
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/person/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setPersons(json)
            console.log(json)
        }
    }

    async function fetchProject() {
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + router.query.projectId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setProject(json)
            console.log(json)
        } else {
            console.log(res.status)
        }
    }

    async function editProject(project: any) {
        console.log(project)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(project)
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setProject(json)
        }
    }


    const handleStateClickOpen = () => {
        setStateOpen(true);
    };

    const handleCategoryClickOpen = () => {
        setTypeOpen(true);
    };


    const handleManagerClickOpen = () => {
        setManagerOpen(true);
    };

    
    const deleteData = async (id: any) => {
        console.log(id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            console.log("ok")
            router.replace('/projects/projects')
        } else {
            console.log(res.status)
        }
    }


    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xl={12} xs={12}>
                {project === undefined ? <React.Fragment></React.Fragment> : <ProjectDetail
                    project={project}
                    editProject={editProject}
                    setState={handleStateClickOpen}
                    setCategory={handleCategoryClickOpen}
                    setManager={handleManagerClickOpen}
                    removeManager={handleManagerClose}
                    deleteData={deleteData}
                    showDescription={true}
                    showEditButton={true} />}
                {projectStates ?
                    <SimpleDialog
                        open={stateOpen}
                        onClose={() => setStateOpen(false)}
                        onItemClick={handleStateClose}
                        choices={projectStates} /> : <React.Fragment />}
                {projectTypes ?
                    <SimpleDialog
                        open={typeOpen}
                        onClose={() => setTypeOpen(false)}
                        onItemClick={handleTypeClose}
                        choices={projectTypes} /> : <React.Fragment />}
                {persons ?
                    <SimpleDialog
                        open={managerOpen}
                        onClose={() => setManagerOpen(false)}
                        onItemClick={handleManagerClose}
                        choices={persons} /> : <React.Fragment />}
            </Grid>
            <Grid item xl={3}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Stats projectId={router.query.projectId} header="tasks">
                        <LabelData label="All" value="22" />
                        <LabelData label="Opened" value="10" />
                        <LabelData label="Closed" value="12" />
                    </Stats>
                </Paper>
            </Grid>

            <Grid item xl={3}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Stats projectId={router.query.projectId} header="tasks">
                        <LabelData label="All" value="22" />
                        <LabelData label="Opened" value="10" />
                        <LabelData label="Closed" value="12" />
                    </Stats>
                </Paper>
            </Grid>
        </Grid>);
}

function SimpleDialog(props: any) {
    const { onClose, onItemClick, selectedValue, open, choices } = props;

    const handleListItemClick = (value: any) => {
        console.log("item click")
        onItemClick(value);
        //onClose(value);
    };
    console.log(choices);
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {choices.map((choice) => (
                    <ListItem key={choice.id} disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(choice)} key={choice.id}>
                            <ListItemAvatar>
                            </ListItemAvatar>
                            <ListItemText primary={choice.surname ? choice.name + " " + choice.surname : choice.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default DetailPage;