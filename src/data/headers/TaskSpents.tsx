import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default interface TaskSpents {
    id: number,
    date: string,
    time: string,
    user: string
}

function toHHMMSS(sec_num: number) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    var finalHours;
    var finalMinutes;
    var finalSeconds;


    if (hours < 10) { finalHours = "0" + hours; }
    if (minutes < 10) { finalMinutes = "0" + minutes; }
    if (seconds < 10) { finalSeconds = "0" + seconds; }
    return finalHours + ':' + finalMinutes + ':' + finalSeconds;
}

export const TaskSpentsColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, align: "left" },
    {
        field: 'date', headerName: 'Date', width: 100, align: "center", headerAlign: "center",
        valueGetter: (params: GridValueGetterParams) => `${new Date(params.row.date).toLocaleDateString() || ''}`
    },
    {
        field: 'time', headerName: 'Time', width: 100, align: "center", headerAlign: "center",
        valueGetter: (params: GridValueGetterParams) => `${toHHMMSS(params.row.time) || ''}`
    },
    {
        field: 'user', headerName: 'User', valueGetter: (params: GridValueGetterParams) =>
            `${params.row.person.name + " " + params.row.person.surname || ''}`, align: "left", headerAlign: "center", width: 200
    }
];
