import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data, xaxis, yaxis }) => (
	<div className="graph">
		<ResponsiveBar
			data={data}
			keys={['value']}
			indexBy="term"
			margin={{ top: 50, right: 60, bottom: 130, left: 80 }}
			padding={0.3}
			colors={{ scheme: 'set2' }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: -45,
				legend: xaxis.substring(0, xaxis.indexOf('enriched')),
				legendPosition: 'middle',
				legendOffset: 100,
				format: v => v.split('$')[1]
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: `No of ${yaxis}s`,
				legendPosition: 'middle',
				legendOffset: -40
			}}
			tooltip={node => {
				const {
					identifier,
					matches,
					populationAnnotationCount,
					description
				} = node.data.tooltip;
				return (
					<div className="tooltip-container">
						<div className="tooltip-data">
							<span
								className="node-color"
								style={{
									background: node.color
								}}
							></span>
							<div className="tooltip-text">
								<strong>{identifier}: </strong>
								{matches} -{' '}
								{((matches / populationAnnotationCount) * 100).toFixed(2)}%
							</div>
						</div>
						<div>
							<strong>Description: </strong>
							{description}
						</div>
						<div>
							<strong>Population Annotation Count: </strong>
							{populationAnnotationCount}
						</div>
					</div>
				);
			}}
			animate={true}
			motionStiffness={90}
			motionDamping={15}
		/>
	</div>
);

export default BarChart;
