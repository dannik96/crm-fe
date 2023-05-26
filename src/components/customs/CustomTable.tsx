import { Height } from "@mui/icons-material";
import { Paper, Box, Toolbar, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useRouter } from "next/router"


export default function CustomTable(props: any) {
    const router = useRouter();
    const handleClickOpen = (props: any) => {
        //router.push("/projects/tasks/" + props.id)
    };

    return (
        <DataGrid
            rows={props.rows}
            columns={props.columns}
            autoPageSize
            onRowClick={handleClickOpen}
            pageSizeOptions={[5]}
            sx={{ border: 0 }}
            disableRowSelectionOnClick
        />
    )
}