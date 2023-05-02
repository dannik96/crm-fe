import PostTableRow from "@/components/channels/posts/PostTableRow";

export const PostTableColumns = [
    {
        name: "id",
        label: "Id"
    },
    {
        name: "name",
        label: "Name"
    },
    {
        name: "from",
        label: "From"
    },
    {
        name: "to",
        label: "To"
    }
];

export const PostTableData =
    [{ id: 1, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 2, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 3, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 4, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 5, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 6, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 7, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" },
    { id: 8, name: "Gabby George", from: "14.04.2022", to: "14.04.2022" }
    ];

export const PostTableOptions = {
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