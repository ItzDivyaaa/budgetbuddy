import React from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartDashboard({ budgetList }) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{
          top: 7,
          right: 5,
          left: 30,
          bottom: 20,
        }}
      >
        <XAxis dataKey='name' />
        <YAxis
          label={{
            value: 'Total Amount (in ₹)',
            angle: -90,
            position: 'insideLeft',
            textAnchor: 'middle',
            dx: -15,
            dy: 60,
            fill: '#4845d2',
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalSpend' fill="#4845d2" /> 
        <Bar dataKey='amount' fill="#C3C2FF" /> 
      </BarChart>
    </div>
  );
}

export default BarChartDashboard;


