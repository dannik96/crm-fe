import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default interface Audiences {
    id: number,
    name: string
}

export const AudiencesColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "right", headerAlign: "right"},
    { field: 'name', headerName: 'Name', width: 200, align: "center", headerAlign: "center" },
    
];
