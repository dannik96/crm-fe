import { Grid } from '@mui/material';
import ProjectPaper from '@/components/projects/ProjectPaper';
import { useEffect, useState } from 'react';
import NewProjectPaper from '@/components/projects/NewProjectPaper';
import { getData } from '@/util/communicationUtil';
import { useRouter } from 'next/router';

function Projects() {
    const [projects, setProjects] = useState([]);
    const router = useRouter();
    useEffect(() => {
        getData(setProjects, router, "/api/project")
    }, [])

    return (
        <Grid container padding={4} spacing={3}>
            {projects.map(project =>
                <ProjectPaper key={project.id} project={project}></ProjectPaper>
            )}
            <NewProjectPaper></NewProjectPaper>
        </Grid>
    )
}

export default Projects;