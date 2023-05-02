import LabelData from '@/components/customs/LabelData';
import Stats from '@/components/projects/Stats';
import { Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ProjectDetail from '@/components/projects/ProjectDetail';

const data = {
    name: "Tootbrush Tootbrush Tootbrush ",
    tasks: 12,
    manager: "Manager",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam commodo dui eget wisi. Curabitur bibendum justo non orci. Integer lacinia. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Nulla pulvinar eleifend sem. Curabitur sagittis hendrerit ante. Nullam sit amet magna in magna gravida vehicula. Morbi scelerisque luctus velit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Cras elementum. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.",
    start: "2.2.2023",
    deadline: "2.2.2024",
    state: "Open",
    category: "Hiring"
}

function DetailPage(props: any) {
    const router = useRouter();
    console.log(router)
    console.log(router.query.projectId);

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xl={12} xs={12}>
                <ProjectDetail
                    name={data.name}
                    manager={data.manager}
                    description={data.description}
                    start={data.start}
                    deadline={data.deadline}
                    state={data.state}
                    category={data.category} 
                    showDescription={true}
                    showEditButton={true}/>
            </Grid>
            {/*<Grid item xl={1}>
                <Stack
                    direction={{ xs: 'column', xl: 'column' }}
                    spacing={2}
                    alignItems="stretch"
                    height="100%">
                <CustomButton>Tasks</CustomButton>
                <CustomButton>Events</CustomButton>
                <CustomButton>Channels</CustomButton>

                </Stack>
            </Grid> */}
            {/* <Grid item xl={4}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <TaskPaper projectId={router.query.projectId} />
                </Paper>

            </Grid>
            <Grid item xl={4}>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <EventsPaper projectId={router.query.projectId} />
                </Paper>

            </Grid> */}
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

export default DetailPage;