import { Box, Stack, Typography } from "@mui/material";


export default function LabelData(props: any) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            minWidth='100%'>
            <Typography variant="body2" component="div">{props.label}</Typography>
            <Typography variant="body1" component="div">{props.value}</Typography>
        </Stack>);
}