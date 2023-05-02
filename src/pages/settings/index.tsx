import PostTable from "@/components/channels/posts/PostTable";
import { EventTableData, EventTableColumns, EventTableOptions } from "@/data/headers/Events";
import { Box, Grid, Paper } from "@mui/material";


export default function Settings(props: any) {
    return (

        <Grid container padding={4} spacing={3}>
            <Grid item xs={4}>
                <Paper
                    sx={{
                        p: 2
                    }}
                >
                    <PostTable data={EventTableData} columns={EventTableColumns} options={EventTableOptions} />
                    
                </Paper>
            </Grid>
        </Grid>)
}