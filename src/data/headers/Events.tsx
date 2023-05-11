import PostTableRow from "@/components/channels/posts/PostTableRow";
import EventTableRow from "@/components/events/EventTableRow";

export const EventTableColumns = [
    {
        name: "id",
        label: "Id"
    },
    {
        name: "name",
        label: "Name"
    },
    {
        name: "startDate",
        label: "Start date"
    },
    {
        name: "endDate",
        label: "End date"
    }
];

export const EventTableOptions = {
    filter: true,
    onFilterChange: (changedColumn: any, filterList: any) => {
        console.log(changedColumn, filterList);
    },
    selectableRows: "none",
    filterType: "dropdown",
    responsive: "simple",
    expandableRows: true,
    tableId: "Posts",
    pagination: false,
    elevation: 0,
    renderExpandableRow: (rowData: any, rowMeta: any) => {
        console.log(rowData, rowMeta);
        return (
            <EventTableRow rowData={rowData}/>
        );
    }
};