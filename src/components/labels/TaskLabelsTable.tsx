import React, { useEffect, useState } from "react";
import MUIDataTable, { FilterType, Responsive, SelectableRows } from "mui-datatables";
import { labelTableColumns } from "@/data/headers/Labels";
import { Button, Stack } from "@mui/material";
import LabelsTableRow from "./LabelsTableRow";
import AddLabelDialog from "../customs/AddLabelDialog";
import { getData } from "@/util/communicationUtil";
import { useRouter } from "next/router";

export default function TaskLabelsTable(props: any) {
    const [postStates, setPostStates] = useState([]);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        getData(setPostStates, router, "/api/task-label/")
    }, [])

    async function fetchPostStates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task-label/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            setPostStates(json)
        }
    }

    async function editPostState(postState) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project-type/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(postState)
        })

        if (res.ok) {
            const json = await res.json()
        }
    }

    const updateData = (params: any, type: string) => {
        setPostStates(postStates);
    }

    const deleteData = async (id: any, type: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task-label/` + id, {
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
        selectableRows: "none" as SelectableRows,
        filterType: "dropdown" as FilterType,
        responsive: "simple" as Responsive,
        expandableRows: true,
        tableId: "Posts",
        pagination: false,
        elevation: 0,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            return (
                <LabelsTableRow rowData={rowData} rowMeta={rowMeta} channel={postStates[rowMeta.rowIndex]} editPostState={editPostState} />
            );
        }
    };

    const getIsDeletable = (id: number) => {
        return postStates.filter(val => val.id === id)[0].deletable;
    }

    async function createProjectState(projectState) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task-label/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(projectState)
        })

        if (res.ok) {
            const json = await res.json()
            setPostStates([ ...postStates, json ])
        }
        setOpen(false)
    }
    return (
        <Stack direction={'column'} spacing={1}>
            <Button variant="contained" onClick={() => setOpen(true)}>Add new</Button>
            {<AddLabelDialog onClose={() => setOpen(false)} open={open} name={'Task label'} onSave={(value) => createProjectState(value)} />}
            <MUIDataTable
                title={"Tasks"}
                data={postStates}
                columns={labelTableColumns(updateData, deleteData, "tasks", getIsDeletable)}
                options={LabelTableOptions}
                key={'taskLabel'}

            />
        </Stack>
    );
};
