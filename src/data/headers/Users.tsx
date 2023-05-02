import PostTableRow from "@/components/channels/posts/PostTableRow";

export const UserTableColumns = [
    {
        name: "id",
        label: "Id"
    },
    {
        name: "userName",
        label: "User name"
    },
    {
        name: "email",
        label: "Email"
    },
    {
        name: "userRoles",
        label: "User role"
    }
];

export const UserTableData =
    [{ id: 1, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 2, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 3, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 4, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 5, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 6, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 7, userName: "Gabby George", email: "gabby.george@seznam.cz", userRoles: "gabby.george@seznam.cz" },
    { id: 8, userName: "Gabby George", email: "gabby.george@s eznam.cz", userRoles: "gabby.george@seznam.cz" }
    ];

export const UserTableOptions = {
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