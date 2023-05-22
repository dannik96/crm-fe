import LabelData from '@/components/customs/LabelData';
import Stats from '@/components/projects/Stats';
import { Avatar, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { blue } from '@mui/material/colors';
import LabelDialog from '@/components/customs/LabelDialog';

function DetailPage(props: any) {
    const [stateOpen, setStateOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [managerOpen, setManagerOpen] = useState(false);
    const [channelOpen, setChannelOpen] = useState(false);
    const [projectStates, setProjectStates] = useState();
    const [projectTypes, setProjectTypes] = useState();
    const [persons, setPersons] = useState([]);
    const [channels, setChannels] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [project, setProject] = useState();
    const [projectTasks, setProjectTasks] = useState([]);
    const [projectEvents, setProjectEvents] = useState([]);
    const router = useRouter();
    console.log(project)
    useEffect(() => {
        fetchProject();
        fetchProjectStates();
        fetchProjectTypes();
        fetchPersons();
        fetchChannels();
        fetchProjectTasks();
        //fetchProjectParticipants();
        //fetchProjectTimeSpent();
    }, [router])

    const handleStateClose = async (value: any) => {
        setStateOpen(false);
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

    async function fetchProjectTasks() {
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + router.query.projectId + "/tasks", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setProjectTasks(json)
        }
    }

    async function fetchProjectStates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project-state/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setProjectStates(json)
        }
    }

    async function fetchChannels() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setChannels(json)
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
        }
    }

    async function fetchPersons() {
        if (router.query.projectId === undefined) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setPersons(json)
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
        } else {
        }
    }

    async function editProject(project: any) {
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

    const handleChannelClickOpen = () => {
        setChannelOpen(true);
    };

    const deleteData = async (id: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            router.replace('/projects/projects')
        } else {
        }
    }
    const handleLabelsChange = async (value: any[]) => {
        let res: any;
        const filteredChannels = project.channels.filter(val => !val.deleted);
        for (let i = 0; i < value.length; i++) {
            if (filteredChannels.filter(val => val.id === value[i].id).length === 0) {
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + project.id + "/add-channel/" + value[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }

        for (let i = 0; i < filteredChannels.length; i++) {
            if (value.filter(val => val.id !== filteredChannels[i].id).length === 0) {
                res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/` + project.id + "/remove-channel/" + filteredChannels[i].id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
            }
        }
        if (res && res.ok) {
            const newProject = { ...project, channels: value }
            setProject(newProject)
        }
        setChannelOpen(false);
    };

    return (
        <Grid container padding={4} spacing={3}>
            {project === undefined ?
                <React.Fragment></React.Fragment> :
                <Grid item xl={12} xs={12}>

                    <ProjectDetail
                        project={project}
                        editProject={editProject}
                        setState={handleStateClickOpen}
                        setCategory={handleCategoryClickOpen}
                        setChannels={handleChannelClickOpen}
                        setManager={handleManagerClickOpen}
                        removeManager={handleManagerClose}
                        deleteData={deleteData}
                        showDescription={true}
                        showEditButton={true} />
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
                    {channels ?
                        <LabelDialog
                            open={channelOpen}
                            onSave={(selectedValues: any) => handleLabelsChange(selectedValues)}
                            selectedValue={project.channels.filter(val => !val.deleted)}
                            onClose={() => setChannelOpen(false)}
                            choices={channels} /> : <React.Fragment />}
                </Grid>
            }
            <Grid item xl={3}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Stats projectId={router.query.projectId} header="tasks">
                        <LabelData label="All" value={projectTasks.filter(val => val && !val.deleted).length} />
                        <LabelData label="Opened" value={projectTasks.filter(val => val.taskState && !val.deleted && val.taskState.name !== "Closed" && val.taskState.name !== "Cancelled").length} />
                        <LabelData label="Closed" value={projectTasks.filter(val => val.taskState && !val.deleted && (val.taskState.name === "Closed" || val.taskState.name === "Cancelled")).length} />
                    </Stats>
                </Paper>
            </Grid>

            
        </Grid>);
}

function SimpleDialog(props: any) {
    const { onClose, onItemClick, selectedValue, open, choices } = props;

    const handleListItemClick = (value: any) => {
        onItemClick(value);
        //onClose(value);
    };
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