import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Link from 'next/link';

interface Data {
    id: number;
    name: string;
    assignee: string;
}

function createData(
    id: number,
    name: string,
    assignee: string,
): Data {
    return {
        id,
        name,
        assignee,
    };
}

const rows = [
    createData(1, "Task 1", "Martin Dlouhy"),
    createData(2, "Task 2", "Jan Kratky"),
    createData(3, "Task 3", "Jindrich Prilisdlouhy"),
    createData(4, "Task 1", "Martin Dlouhy"),
    createData(5, "Task 2", "Jan Kratky"),
    createData(6, "Task 3", "Jindrich Prilisdlouhy"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Id',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'assignee',
        numeric: true,
        disablePadding: false,
        label: 'Assignee',
    }
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'id';
const DEFAULT_ROWS_PER_PAGE = 5;

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function TaskPaper(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, newOrderBy);
        };

    return (
        <TableHead>
            <TableRow >
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}

                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable(props: any) {
    const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState<keyof Data>(DEFAULT_ORDER_BY);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [visibleRows, setVisibleRows] = React.useState<Data[] | null>(null);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

    React.useEffect(() => {
        let rowsOnMount = stableSort(
            rows,
            getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
        );
        rowsOnMount = rowsOnMount.slice(
            0 * rowsPerPage,
            0 * rowsPerPage + rowsPerPage,
        );

        setVisibleRows(rowsOnMount);
    }, []);

    const handleRequestSort = React.useCallback(
        (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => {
            const isAsc = orderBy === newOrderBy && order === 'asc';
            const toggledOrder = isAsc ? 'desc' : 'asc';
            setOrder(toggledOrder);
            setOrderBy(newOrderBy);

            const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
            const updatedRows = sortedRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            );
            setVisibleRows(updatedRows);
        },
        [order, orderBy, page, rowsPerPage],
    );

    const handleChangePage = React.useCallback(
        (event: unknown, newPage: number) => {
            setPage(newPage);
            console.log(newPage)
            const sortedRows = stableSort(rows, getComparator(order, orderBy));
            const updatedRows = sortedRows.slice(
                newPage * rowsPerPage,
                newPage * rowsPerPage + rowsPerPage,
            );
            setVisibleRows(updatedRows);

            // Avoid a layout jump when reaching the last page with empty rows.
            const numEmptyRows =
                newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

            const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
            setPaddingHeight(newPaddingHeight);
        },
        [order, orderBy, dense, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <Link href={'/projects/projects/' + props.projectId + '/tasks'}>
                        Tasks
                    </Link>
                </Typography>
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <TaskPaper
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {visibleRows
                            ? visibleRows.map((row, index) => {

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="center">{row.assignee}</TableCell>
                                    </TableRow>
                                );
                            })
                            : null}
                        {paddingHeight > 0 && (
                            <TableRow
                                style={{
                                    height: paddingHeight,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[-1]}
            />
        </Box>
    );
}