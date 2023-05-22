import PostTableRow from "@/components/channels/posts/PostTableRow";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

export const UserTableColumns = [
    {
        name: "id",
        label: "Id"
    },
    {
        name: "username",
        label: "User name"
    },
    {
        name: "email",
        label: "Email"
    },
    {
        name: "roles",
        label: "User role",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return getLines(value)
            }
        }
    },
    {
        name: "deleted",
        label: "Active",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return !value ? <React.Fragment /> : <CloseIcon />
            }
        }
    }
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

function getLines(value: any) {
    let str = "";
    for(let i = 0; i< value.length; i++) {
        str += value[i].name;
        if (i !== value.length -1) {
            str += ", "
        }
    }
    return str;
}
