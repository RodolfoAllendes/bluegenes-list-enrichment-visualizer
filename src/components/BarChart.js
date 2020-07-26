import React from 'react';
import { Bar } from '@nivo/bar';

const BarChart = ({ data }) => (
	<div
		style={{
			width: 'calc(100vw - 5rem)',
			height: 700,
			textAlign: 'center',
			overflowX: 'scroll',
			overflowY: 'hidden'
		}}
	>
		<Bar
			data={data}
			keys={['value']}
			indexBy="GoTerm"
			margin={{ top: 50, right: 60, bottom: 150, left: 80 }}
			padding={0.3}
			colors={{ scheme: 'nivo' }}
			height={700}
			width={data.length * 50 + 100}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: -45,
				legend: 'GO Term',
				legendPosition: 'middle',
				legendOffset: 120
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'No of Genes',
				legendPosition: 'middle',
				legendOffset: -40
			}}
			animate={true}
			motionStiffness={90}
			motionDamping={15}
		/>
	</div>
);

export default BarChart;
