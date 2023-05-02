import PostTable from "@/components/channels/posts/PostTable";
import { EventTableData, EventTableColumns, EventTableOptions } from "@/data/headers/Events";
import { Box, Grid, Paper, Typography } from "@mui/material";


export default function Settings(props: any) {
    return (

        <Grid container padding={4} spacing={3}>
            <Grid item xs={12} sx={{ mx: 2 }}>
                <Typography variant="h3">States</Typography>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Posts"} data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Projects"} data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Tasks"} data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>

            <Grid item xs={12} sx={{ mx: 2 }}>
                <Typography variant="h3">Labels and types</Typography>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Projects"} data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Tasks"} data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Channels"}data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
            
            <Grid item xs={6}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable header={"Events"} data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                </Paper>
            </Grid>
            
        </Grid>)
}