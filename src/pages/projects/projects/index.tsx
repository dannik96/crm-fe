import { Grid } from '@mui/material';
import ProjectPaper from '@/components/projects/ProjectPaper';

function NewsPage() {
    return (
        <Grid container padding={4} spacing={3}>
            <ProjectPaper></ProjectPaper>
            <ProjectPaper></ProjectPaper>
            <ProjectPaper></ProjectPaper>
        </Grid>
    )
}

export default NewsPage;