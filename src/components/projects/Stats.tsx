import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";


export default function Stats(props: any) {
    return (
        <React.Fragment>
            <Box sx={{ my: 3, mx: 2, mb: 3 }}>
                <Typography variant="h4">
                    <Link href={"/projects/projects/" + props.projectId + "/" + props.header}>
                        {props.header.charAt(0).toUpperCase() + props.header.slice(1).toLowerCase()}
                    </Link>
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ my: 3, mx: 4 }}>
                <Stack
                    spacing={2}
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="flex-start">
                    {props.children}
                </Stack>
            </Box>
        </React.Fragment>
    )
}