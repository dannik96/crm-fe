import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import React from 'react';
export function labelTableColumns(updateData: Function, deleteData: Function, type: string, deletable: Function) {
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
        name: "",
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                if (deletable(tableMeta.rowData[0])) {
                    return (
                        <IconButton aria-label="edit" onClick={(e) => {
                            deleteData(tableMeta.rowData[0], type);
                        }}>
                            <DeleteIcon color="primary" />
                        </IconButton>
                    );
                } else {
                    return (<React.Fragment />)
                }
            }
        }
    }
    ];
}
