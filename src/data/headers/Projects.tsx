import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default interface Project {
    id: number,
    name: string,
    deadline: string,
    state: string,

}

export const ProjectsColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "right", headerAlign: "right" },
    { field: 'name', headerName: 'Name', width: 200, align: "center", headerAlign: "center" },
    {
        field: 'state', headerName: 'State', valueGetter: (params: GridValueGetterParams) =>
            `${params.row.projectState.name || ''}`, align: "center", headerAlign: "center", width: 100
    },
    {
        field: 'deadline', headerName: 'Deadline', width: 100, align: "right", headerAlign: "right",
        valueGetter: (params: GridValueGetterParams) => `${new Date(params.row.deadline).toLocaleDateString()}`
    }

];
