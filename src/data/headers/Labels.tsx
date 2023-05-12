import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
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
                    <IconButton aria-label="edit" onClick={(e) => {
                        deleteData(tableMeta.rowData[0], type);
                    }}>
                        <DeleteIcon color="primary" />
                    </IconButton>
                );
            }
        }
    }
    ];
}
