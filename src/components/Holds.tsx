import React, { useEffect } from 'react';
import Header from './Header';
import { DataGrid, ColDef, RowId } from '@material-ui/data-grid';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { runInAction } from 'mobx';
import { instance } from '../constants';
import { AxiosResponse } from 'axios';

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
    { field: 'holdID', headerName: 'Hold ID', width: 150 },
    { field: 'bookISBN', headerName: 'Book ISBN', width: 180 },
    { field: 'bookName', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'edition', headerName: 'Edition', width: 130 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'holds', headerName: 'Holds', width: 100 },
    { field: 'holdExpiryDate', headerName: 'Expiry Date', width: 150 }
];

let rows: Book[] = [
    {
        id: 1,
        holdID: null,
        bookISBN: '',
        bookName: '',
        author: '',
        edition: '',
        category: '',
        holds: null,
        holdExpiryDate: null
    }
];

interface Book {
    id: number;
    bookISBN: string;
    bookName: string;
    author: string;
    holdID?: number | null;
    edition: string;
    holdExpiryDate?: Date | null;
    category: string;
    holds?: number | null;
}

let message = '';

export const Holds: React.FC = () => {
    const [dataRows, setDataRows] = React.useState<Book[]>(rows);
    const [selections, setSelection] = React.useState<RowId[]>([]);

    const cancelHoldBooks = () => {
        console.log(selections);
        for (const selection of selections) {
            const select = (selection as number) - 1;
            console.log(select);
            console.log(dataRows[select]);
            cancelHoldBook(dataRows[select]);
        }
    };
    const cancelHoldBook = (book: Book) => {
        const holdID = book.holdID;
        const holdFormData = new FormData();
        holdFormData.append('holdID', String(holdID));
        console.log(book);
        instance
            .post('library/cancelHoldBooks', holdFormData)
            .then(function(response: AxiosResponse) {
                console.log(response.data);
                message = response.data;
            })
            .catch(function(error) {
                console.log(error);
                message = error;
            });
    };

    useEffect(() => {
        runInAction(() => {
            instance
                .post('user/userHolds')
                .then((response: AxiosResponse) => {
                    if (Array.isArray(response.data)) {
                        console.log(response.data);
                        rows = response.data;
                        rows.forEach(function(item, index) {
                            item.id = index + 1;
                        });
                        setDataRows(rows);
                    } else {
                        rows = [
                            {
                                id: 1,
                                holdID: null,
                                bookISBN: '',
                                bookName: '',
                                author: '',
                                edition: '',
                                category: '',
                                holds: null,
                                holdExpiryDate: null
                            }
                        ];
                        setDataRows(rows);
                        console.log(response.data);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
        if (message !== '') {
            alert(message);
            message = '';
        }
    }, [cancelHoldBooks]);

    const classes = useStyles();
    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Holds</h3>
                </header>
            </div>
            <Button variant='contained' color='primary' className={classes.selectEmpty} onClick={cancelHoldBooks}>
                Cancel Hold
            </Button>

            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={dataRows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    onSelectionChange={newSelection => {
                        setSelection(newSelection.rowIds);
                    }}
                />
            </div>
        </>
    );
};
