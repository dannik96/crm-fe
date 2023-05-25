import { GridColDef } from "@mui/x-data-grid";


export const ProjectEvents: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "left" },
    {
        field: 'name', headerName: 'Name', width: 100, align: "center", headerAlign: "center",
        valueGetter: (params: GridValueGetterParams) => `${new Date(params.row.date).toLocaleDateString() || ''}`
    },
    {
        field: 'startDate', headerName: 'Time', width: 200, align: "center", headerAlign: "center",
        valueGetter: (params: GridValueGetterParams) => `${new Date(params.row.startDate).toLocaleString() || ''}`
    },
    {
        field: 'endDate', headerName: 'User', valueGetter: (params: GridValueGetterParams) =>
            `${new Date(params.row.endDate).toLocaleString() || ''}`, align: "center", headerAlign: "center", width: 200
    }
];