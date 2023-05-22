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
                return value ? value.name + " " + value.surname : ""
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