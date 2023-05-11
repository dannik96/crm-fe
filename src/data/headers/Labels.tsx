import PostTableRow from "@/components/channels/posts/PostTableRow";
import EventTableRow from "@/components/events/EventTableRow";
import { FilterType, Responsive, SelectableRows } from "mui-datatables";

export function labelTableColumns(updateData: Function, deleteData: Function, type : string) {
    return [{
        name: "id",
        label: "Id"
    },
    {
        name: "name",
        label: "Name"
    },
    {
        name: "description",
        label: "Description"
    },
    {
        name: "Delete",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                return (
                    <button
                        onClick={(e) => {
                            deleteData(tableMeta.rowData[0], type);
                        }}
                    >
                        Delete
                    </button>
                );
            }
        }
    }
    ];
}
