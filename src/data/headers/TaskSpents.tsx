import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default interface TaskSpents {
    id: number,
    date: string,
    time: string,
    user: string
}

export const TaskSpentsColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "left" },
    { field: 'date', headerName: 'Date', width: 100, align: "center", headerAlign: "center" },
    { field: 'time', headerName: 'Time', width: 100, align: "center", headerAlign: "center" },
    {
        field: 'user', headerName: 'User', valueGetter: (params: GridValueGetterParams) =>
            `${params.row.user.name || ''}`, align: "left", headerAlign: "center", width: 200
    }
];
