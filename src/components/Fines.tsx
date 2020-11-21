import { ColDef, DataGrid } from '@material-ui/data-grid';
import { AxiosResponse } from 'axios';
import { runInAction } from 'mobx';
import React, { useEffect } from 'react';
import { API, instance } from '../constants';
import UserStore from '../stores/UserStore';
import './App.css';
import Header from './Header';

const columns: ColDef[] = [
    { field: 'id', headerName: 'Transaction ID', width: 180 },
    { field: 'bookName', headerName: 'Title', width: 350 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'date', headerName: 'Return/ Lost Date', width: 200 },
    { field: 'fine', headerName: 'Fine', width: 130 }
];

let rows = [
    {
        id: 1,
        bookName: '',
        author: '',
        date: new Date(),
        fine: 0.0
    }
];

const Fines = () => {
    const [dataRows, setDataRows] = React.useState(rows);

    useEffect(() => {
        setDataRows(rows);
        runInAction(() => {
            if (UserStore.usertype === 'student' || UserStore.usertype === 'professor') {
                instance
                    .post(API + '/user/userFines', { listType: 'getTransactionWithFines' })
                    .then((response: AxiosResponse) => {
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                instance
                    .post(API + '/user/userFines', { listType: 'getOutstandingFineOnAccount' })
                    .then((response: AxiosResponse) => {
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        });
    }, []);

    return (
        <>
            <Header />
            <div className='App'>
                <header className='App-header'>
                    <h3>Fines</h3>
                </header>
            </div>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={dataRows} columns={columns} pageSize={10} checkboxSelection />
            </div>
        </>
    );
};

export default Fines;
