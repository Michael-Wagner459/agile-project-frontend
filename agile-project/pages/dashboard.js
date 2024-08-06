import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeals } from '@/app/slice/dealsSlice';
import axios from '../app/axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Dashboard = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const getStageData = () => {
    const stages = ['Initiated', 'Qualified', 'Contract Sent', 'Closed Won', 'Closed Lost'];
    const stageCounts = stages.map((stage) => ({
      name: stage,
      y: deals.filter((deal) => deal.stage === stage).length,
    }));
    return stageCounts;
  };

  const getContractsWonLostData = () => {
    const won = deals.filter((deal) => deal.stage === 'Closed Won').length;
    const lost = deals.filter((deal) => deal.stage === 'Closed Lost').length;
    return [
      { name: 'Contracts Won', y: won },
      { name: 'Contracts Lost', y: lost },
    ];
  };

  const getMoneyData = () => {
    const wonAmount = deals
      .filter((deal) => deal.stage === 'Closed Won')
      .reduce((total, deal) => total + deal.amount, 0);
    const lostAmount = deals
      .filter((deal) => deal.stage === 'Closed Lost')
      .reduce((total, deal) => total + deal.amount, 0);
    return [
      { name: 'Money Gained', y: wonAmount },
      { name: 'Money Lost', y: lostAmount },
    ];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: { type: 'bar' },
              title: { text: 'Contracts in Each Stage' },
              xAxis: { categories: getStageData().map((data) => data.name) },
              yAxis: { title: { text: 'Number of Contracts' } },
              series: [{ name: 'Contracts', data: getStageData() }],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: { type: 'pie' },
              title: { text: 'Contracts Won vs Lost' },
              series: [
                {
                  name: 'Contracts',
                  colorByPoint: true,
                  data: getContractsWonLostData(),
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: { type: 'pie' },
              title: { text: 'Money Gained vs Lost' },
              series: [
                {
                  name: 'Money',
                  colorByPoint: true,
                  data: getMoneyData(),
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
