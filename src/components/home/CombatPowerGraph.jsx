import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

export function CombatPowerGraph(props) {
  const date = props.weekContributions.map((week_contribution)=>{
    const formattedDate = new Date(week_contribution.created_at);
    return formattedDate.toLocaleDateString('ja-JP', { year: undefined, month: 'long', day: 'numeric' });
  })
  const Contributions = props.weekContributions.map((week_contribution)=> week_contribution.week_contributions)

  const graphData = {
    labels: date,
    datasets: [
      {
        label: "戦闘力",
        data: Contributions,
        borderColor: "rgba(34, 197, 94, 0.7)",
        backgroundColor: "rgba(34, 197, 94, 1)",
        yAxisID: "y"
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
    　　display: false
      }
    },
    scales: {
      y: {
        stacked: false,
        position: "left",
      }
    }
  };
  return (
    <div>
      <p className="text-center font-bold text-lg">戦闘力の推移</p>
      <div className="mx-auto m-3 mb-10 w-[90vw] lg:w-[40vw] h-[50vh]">
        <Line
          height={500}
          width={1000}
          data={graphData}
          options={options}
          id="chart-key"
        />
      </div>
    </div>
  );
}
