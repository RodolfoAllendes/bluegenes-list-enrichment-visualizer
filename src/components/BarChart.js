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
				legendOffset: 120,
				format: v => v.split('$')[1]
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'No of Genes',
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
					<div
						style={{
							background: 'white',
							color: 'inherit',
							fontSize: 'inherit',
							borderRadius: 2,
							boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px',
							padding: '5px 9px'
						}}
					>
						<div
							style={{
								whiteSpace: 'pre',
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<span
								style={{
									display: 'block',
									width: 12,
									height: 12,
									background: node.color,
									marginRight: 7,
									textAlign: 'left'
								}}
							></span>
							<span>
								<strong>{identifier}: </strong>
								{matches} -{' '}
								{((matches / populationAnnotationCount) * 100).toFixed(2)}%
							</span>
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
