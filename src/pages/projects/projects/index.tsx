import { Grid } from '@mui/material';
import ProjectPaper from '@/components/projects/ProjectPaper';
import { useEffect, useState } from 'react';

function NewsPage() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetchProjects();
    }, [])

    async function fetchProjects() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            const json = await res.json()
            setProjects(json)
        }
    }

    return (
        <Grid container padding={4} spacing={3}>
            {projects.map(project =>
                <ProjectPaper key={project.id} project={project}></ProjectPaper>
            )}
        </Grid>
    )
}

export default NewsPage;