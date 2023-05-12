import React, { useEffect, useRef, useState } from "react";
import MUIDataTable, { FilterType, Responsive, SelectableRows } from "mui-datatables";
import { labelTableColumns } from "@/data/headers/Labels";
import { IconButton, Stack, TableCell, TableRow, TextField, Typography } from "@mui/material";
import LabelsTableRow from "./LabelsTableRow";


export default function ChannelTypesTable(props: any) {
    const [postStates, setPostStates] = useState([]);
    const [disabled, setDisabled] = useState<boolean[] | []>([]);
    const nameRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        fetchPostStates()
    }, [])

    async function fetchPostStates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel-type/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            setPostStates(json)
            setDisabled(Array(json.length).fill(true))
        }
    }

    async function editPostState(postState) {
        console.log(postState)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel-type/`, {
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
            setDisabled(Array(json.length).fill(true))
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel-type/` + id, {
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
            console.log(rowMeta)
            return (
            <LabelsTableRow rowData={rowData} rowMeta={rowMeta} channel={postStates[rowMeta.rowIndex]} editPostState={editPostState}/>);
        }
    };

    return (
        <MUIDataTable
            title={"Channels"}
            data={postStates}
            columns={labelTableColumns(updateData, deleteData, "channels")}
            options={LabelTableOptions}
            key={'channel'}

        />
    );
};

