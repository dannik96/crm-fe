import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default interface TaskPosts {
    id: number,
    name: string,
    state: string,
    postDate: string
}

export const TaskPostsColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "right" },
    { field: 'name', headerName: 'Name', width: 150, align: "left", headerAlign: "left" },
    {
        field: 'state', headerName: 'State', valueGetter: (params: GridValueGetterParams) =>
            `${params.row.postState.name || ''}`, align: "left", headerAlign: "left", width: 100
    },
    {
        field: 'postDate', headerName: 'Post date', width: 100, align: "left", headerAlign: "left",
        valueGetter: (params: GridValueGetterParams) => `${new Date(params.row.postDate).toLocaleDateString()}`
    },

];
