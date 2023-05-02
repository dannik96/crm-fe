import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default interface TaskParticipants {
    id: number,
    name: string
}

export const TaskParticipantsColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "right", headerAlign: "right"},
    { field: 'name', headerName: 'Name', width: 200, align: "center", headerAlign: "center" },
    
];
