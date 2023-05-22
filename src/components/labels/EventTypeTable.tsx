import React, { useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive, SelectableRows } from "mui-datatables";
import { labelTableColumns } from "@/data/headers/Labels";
import { Button, IconButton, Stack, TableCell, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LabelsTableRow from "./LabelsTableRow";
import AddLabelDialog from "../customs/AddLabelDialog";

export default function EventTypeTable(props: any) {
    const [postStates, setPostStates] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchPostStates()
    }, [])

    async function fetchPostStates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event-type/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setPostStates(json)
        }
    }

    async function editPostState(postState) {
        console.log(postState)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event-type/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(postState)
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
        }
    }

    const updateData = (params: any, type: string) => {
        console.log(params)
        console.log(type)
        setPostStates(postStates);
    }

    const deleteData = async (id: any, type: string) => {
        console.log("delete" + id)
        console.log(postStates.filter(postState => postState.id !== id));
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event-type/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        if (res.ok) {
            setPostStates(postStates.filter(postState => postState.id !== id));
        }
    }

    const LabelTableOptions = {
        filter: true,
        onFilterChange: (changedColumn: any, filterList: any) => {
            console.log(changedColumn, filterList);
        },
        selectableRows: "none" as SelectableRows,
        filterType: "dropdown" as FilterType,
        responsive: "simple" as Responsive,
        expandableRows: true,
        tableId: "Posts",
        pagination: false,
        elevation: 0,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            console.log(rowData, rowMeta);
            return (
                <LabelsTableRow rowData={rowData} rowMeta={rowMeta} channel={postStates[rowMeta.rowIndex]} editPostState={editPostState} />
            );
        }
    };

    const getIsDeletable = (id: number) => {
        return postStates.filter(val => val.id === id)[0].deletable;
    }

    async function createProjectState(projectState) {
        console.log(projectState)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event-type/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(projectState)
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setPostStates([...postStates, json])
        }
        setOpen(false)
    }

    return (
        <Stack direction={'column'} spacing={1}>
            <Button variant="contained" onClick={() => setOpen(true)}>Add new</Button>
            {<AddLabelDialog onClose={() => setOpen(false)} open={open} name={'Event type'} onSave={(value) => createProjectState(value)} />}

            <MUIDataTable
                title={"Events"}
                data={postStates}
                columns={labelTableColumns(updateData, deleteData, "event", getIsDeletable)}
                options={LabelTableOptions}
                key={'eventType'}

            />
        </Stack>
    );
};

