import React from 'react';
import Header from './Header';
import { DataGrid, ColDef, RowId } from '@material-ui/data-grid';
import { Button, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Theme } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { instance } from '../constants';
import { useHistory } from 'react-router';

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
    { field: 'category', headerName: 'Category', width: 250 },
    {
        field: 'holds',
        headerName: 'Holds',
        width: 100
    }
];

let rows: Book[] = [
    {
        id: 1,
        bookISBN: '',
        bookName: '',
        author: '',
        pages: null,
        edition: '',
        express: null,
        category: '',
        holds: null
    }
];

interface Book {
    id: number;
    bookISBN: string;
    bookName: string;
    author: string;
    pages?: number | null;
    edition: string;
    express?: boolean | null;
    category: string;
    holds?: number | null;
}
export const BrowseCatalogue: React.FC = () => {
    const classes = useStyles();
    const [searchType, setSearchType] = React.useState('');
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [dataRows, setDataRows] = React.useState<Book[]>(rows);
    const [selections, setSelection] = React.useState<RowId[]>([]);
    let message = '';
    const history = useHistory();
    const FormData = require('form-data');
    const form = new FormData();
    form.append('searchType', searchType);
    form.append('searchWord', searchKeyword);

    const changeSearchType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearchType(event.target.value as string);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const doSearch = () => {
        instance
            .post('library/searchCatalogue', form)
            .then(function(response: AxiosResponse) {
                if (response.data !== 'No rows') {
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
                            bookISBN: '',
                            bookName: '',
                            author: '',
                            pages: null,
                            edition: '',
                            express: null,
                            category: '',
                            holds: null
                        }
                    ];
                    setDataRows(rows);
                    console.log(response.data);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    const holdBooks = () => {
        console.log(selections);
        for (const selection of selections) {
            const select = (selection as number) - 1;
            console.log(select);
            console.log(dataRows[select]);
            holdBook(dataRows[select]);
        }
        history.push('/BrowseCatalogue');
        alert(message);
        message = '';
    };
    const holdBook = (book: Book) => {
        const bookISBN = book.bookISBN;
        const holdFormData = new FormData();
        holdFormData.append('bookISBN', bookISBN);
        console.log(selections);
        instance
            .post('library/holdBooks', holdFormData)
            .then(function(response: AxiosResponse) {
                console.log(response.data);
                message = response.data;
            })
            .catch(function(error) {
                console.log(error);
                message = error;
            });
    };
    React.useEffect(() => {
        if (searchType !== '') {
            doSearch();
        }
    }, [searchKeyword]);

    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Browse Catalogue</h3>
                </header>
            </div>
            <FormControl className={classes.formControl}>
                <InputLabel id='select-user-type'>User Type</InputLabel>
                <Select labelId='select-user-type' id='select-user-type' value={searchType} onChange={changeSearchType}>
                    <MenuItem value='title'>Title</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='ISBN'>ISBN</MenuItem>
                    <MenuItem value='keyword'>Keyword</MenuItem>
                    <MenuItem value='tag'>Tags</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id='standard-search'
                label='Search field'
                type='search'
                value={searchKeyword}
                className={classes.textField}
                onChange={handleSearch}
            />
            <Button variant='contained' color='primary' className={classes.selectEmpty} onClick={holdBooks}>
                Hold
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
