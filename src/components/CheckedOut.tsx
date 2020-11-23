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
    { field: 'bookName', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'holds', headerName: 'Holds', width: 100 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'renewedTime', headerName: 'Times Renewed', width: 150 }
];

let message = '';

let rows: Book[] = [
    {
        id: 1,
        bookName: '',
        author: '',
        dueDate: null,
        holds: null,
        renewedTime: null,
        bookBarcode: null
    }
];

interface Book {
    id: number;
    bookName: string;
    author: string;
    renewedTime?: number | null;
    dueDate?: Date | null;
    holds?: number | null;
    bookBarcode?: number | null;
}

export const CheckedOut: React.FC = () => {
    const [dataRows, setDataRows] = React.useState<Book[]>(rows);
    const [selections, setSelection] = React.useState<RowId[]>([]);

    const renewBooks = () => {
        console.log(selections);
        for (const selection of selections) {
            const select = (selection as number) - 1;
            console.log(select);
            console.log(dataRows[select]);
            renewBook(dataRows[select]);
        }
    };
    const renewBook = (book: Book) => {
        const bookBarcode = book.bookBarcode;
        const bookFormData = new FormData();
        bookFormData.append('bookBarcode', String(bookBarcode));
        console.log(book);
        instance
            .post('library/renewBooks', bookFormData)
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
                .post('user/userCheckedOut')
                .then((response: AxiosResponse) => {
                    if (Array.isArray(response.data)) {
                        console.log(response.data);
                        rows = response.data;
                        rows.forEach(function(item, index) {
                            item.id = index + 1;
                        });
                        console.log(rows);
                        setDataRows(rows);
                    } else {
                        rows = [
                            {
                                id: 1,
                                bookName: '',
                                author: '',
                                dueDate: null,
                                holds: null,
                                renewedTime: null,
                                bookBarcode: null
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
    }, [renewBooks]);

    const classes = useStyles();
    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Checked Out Books</h3>
                </header>
            </div>
            <Button variant='contained' color='primary' className={classes.selectEmpty} onClick={renewBooks}>
                Renew Date
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
