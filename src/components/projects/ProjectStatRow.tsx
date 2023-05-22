import { Stack, Typography } from "@mui/material";

export default function ProjectStatRow(props: any) {
    return (
        <Stack justifyContent="space-between" flexDirection="row" mb={1}>
            <Typography variant="body2" >{props.name}</Typography>
            <Typography variant="body1">{props.value}</Typography>
        </Stack>);
}