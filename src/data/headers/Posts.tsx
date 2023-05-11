import PostTableRow from "@/components/channels/posts/PostTableRow";
import { GridValueGetterParams } from "@mui/x-data-grid";

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
        name: "author",
        label: "Author",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return value.name + " " + value.surname
            }
        }
    },
    {
        name: "postDate",
        label: "Post date",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return new Date(value).toLocaleDateString()
            }
        }
    }
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
            <PostTableRow rowData={rowData} />
        );
    }
};