import React from 'react';
import Header from './Header';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        textField: {
            margin: theme.spacing(1),
            minWidth: 200
        },
        selectEmpty: {
            margin: theme.spacing(1),
            marginTop: theme.spacing(2)
        }
    })
);

const columns: ColDef[] = [
    { field: 'bookISBN', headerName: 'Book ISBN', width: 180 },
    { field: 'bookName', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'pages', headerName: 'Pages', width: 100 },
    { field: 'edition', headerName: 'Edition', width: 130 },
    { field: 'express', headerName: 'Status', width: 100 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
        field: 'holds',
        headerName: 'Holds',
        width: 100
    }
];

let dataRows = [
    {
        id: 1,
        bookISBN: '978-9-4533-0480-4',
        bookName: 'Magical Theory',
        author: 'Adalbert Waffling',
        pages: 538,
        edition: 'regular',
        express: 0,
        category: 'Magical Theory',
        holds: 1
    }
];

export const Holds: React.FC = () => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Holds</h3>
                </header>
            </div>
            <Button variant='contained' color='primary' className={classes.selectEmpty}>
                Cancel Hold
            </Button>

            <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={dataRows} columns={columns} pageSize={10} checkboxSelection />
            </div>
        </>
    );
};
