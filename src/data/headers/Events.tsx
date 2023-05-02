import PostTableRow from "@/components/channels/posts/PostTableRow";

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
        name: "postDate",
        label: "Post date"
    },
    {
        name: "state",
        label: "State"
    }
];

export const EventTableData =
    [{ id: 1, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 2, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 3, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 4, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 5, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 6, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 7, name: "Gabby George", postDate: "14.04.2022", state: "Open" },
    { id: 8, name: "Gabby George", postDate: "14.04.2022", state: "Open" }
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
            <PostTableRow rowData={rowData}/>
        );
    }
};