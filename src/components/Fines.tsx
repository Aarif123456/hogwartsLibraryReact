import { ColDef, DataGrid } from '@material-ui/data-grid';
import { AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import React, { useEffect } from 'react';
import { instance } from '../constants';
import UserStore from '../stores/UserStore';
import './App.css';
import Header from './Header';

const columns: ColDef[] = [
    { field: 'transactionID', headerName: 'Transaction ID', width: 180 },
    { field: 'bookName', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'returnDate', headerName: 'Return/ Lost Date', width: 200 },
    { field: 'fine', headerName: 'Fine', width: 130 }
];

let rows = [
    {
        id: 1,
        transactionID: null,
        bookName: '',
        author: '',
        returnDate: '',
        fine: null
    }
];

const Fines = () => {
    const [dataRows, setDataRows] = React.useState(rows);
    const FormData = require('form-data');
    const form = new FormData();
    if (UserStore.usertype === 'student' || UserStore.usertype === 'professor') {
        form.append('listType', 'getTransactionWithFines');
    } else {
        form.append('listType', 'getOutstandingFineOnAccount');
    }

    useEffect(() => {
        setDataRows(rows);
        runInAction(() => {
            instance
                .post('user/userFines', form)
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
                                transactionID: null,
                                bookName: '',
                                author: '',
                                returnDate: '',
                                fine: null
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
    }, []);

    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Fines</h3>
                </header>
                <p>You have currently {dataRows[0].transactionID === null ? 0 : dataRows.length} fines!</p>
            </div>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={dataRows} columns={columns} pageSize={10} checkboxSelection />
            </div>
        </>
    );
};

export default Fines;
