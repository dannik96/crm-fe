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
        label: "Start date",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return new Date(value).toLocaleDateString() + " " + new Date(value).toLocaleTimeString()
            }
        }
    },
    {
        name: "endDate",
        label: "End date",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return new Date(value).toLocaleDateString() + " " + new Date(value).toLocaleTimeString()
            }
        }
    }
];
