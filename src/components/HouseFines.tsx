import React, { FC, useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { runInAction } from 'mobx';
import Axios, { AxiosResponse } from 'axios';
import { API } from '../constants';
import Chart from 'react-google-charts';

export type HouseFinesChartData = { house: string; total: number };
export type StringNumberArray = (string | number)[][];
export const HouseFines: FC = () => {
    const chartHeader: StringNumberArray = [['House', 'Fines']];
    const [fineData, setFineData] = useState<StringNumberArray>(chartHeader);
    const getHouseFine = (): void => {
        const FormData = require('form-data');
        const form = new FormData();
        form.append('chartType', 'houseFine');
        runInAction(() => {
            Axios.post(API + 'chart/guestCharts', form)
                .then(function(response: AxiosResponse<HouseFinesChartData[]>) {
                    console.log(response.data);
                    const fineDataReceived = chartHeader;
                    for (const houseData of response.data) {
                        fineDataReceived.push([houseData.house, Number(houseData.total)]);
                    }
                    setFineData(fineDataReceived);
                })
                .catch(function(error) {
                    console.error(error);
                });
        });
    };
    /* eslint-disable */
    useEffect(() => {
        getHouseFine();
    }, []);
    /* eslint-enable */

    const options = {
        title: 'Cumulative Fine of Hogwarts houses'
    };
    return (
        <>
            <Header /> <Chart chartType='PieChart' width='100%' height='400px' data={fineData} options={options} />
        </>
    );
};
