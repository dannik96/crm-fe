import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import PostTableRow from "./PostTableRow";

const ExpandableRowTable = (props: any) => {

    return (
        <MUIDataTable
            title={props.header ? props.header : "ACME Employee list"}
            data={props.data}
            columns={props.columns}
            options={props.options}
            key={'table'}
            
        />
    );
};

export default ExpandableRowTable;
