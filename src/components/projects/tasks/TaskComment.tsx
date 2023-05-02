import { Box, Stack, Typography } from "@mui/material";


export default function TaskComment(props: any) {
    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography variant="body2">{props.comment.date}</Typography>
                <Typography variant="body2">{props.comment.user.name}</Typography>
            </Stack>
            <Typography variant="body1">{props.comment.text}</Typography>
        </Box>)
}