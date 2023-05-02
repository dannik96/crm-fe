import ProjectDetail from '@/components/projects/ProjectDetail';
import TaskByStatePaper from '@/components/projects/tasks/TaskByStatePaper';
import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';

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

function DetailPage() {
    const router = useRouter();

    console.log(router.query.projectId);

    return (
        <Grid container padding={4} spacing={3}>
            <Grid item xl={12} xs={12}>
                <Stack spacing={3}>
                    <ProjectDetail
                        name={data.name}
                        manager={data.manager}
                        description={data.description}
                        start={data.start}
                        deadline={data.deadline}
                        state={data.state}
                        category={data.category}
                        showDescription={false}
                        showEditButton={false} />
                    <TaskByStatePaper label={"Open"} />
                    <TaskByStatePaper label={"Open"} />
                </Stack>
            </Grid>
        </Grid>);
}

export default DetailPage;