import React from 'react';
import { Bar } from '@nivo/bar';

const BarChart = ({ data }) => (
	<div
		style={{
			width: 'calc(100vw - 5rem)',
			height: 630,
			textAlign: 'center',
			overflowX: 'scroll',
			overflowY: 'hidden',
			margin: '0 30px'
		}}
	>
		<Bar
			data={data}
			keys={['value']}
			indexBy="GoTerm"
			margin={{ top: 50, right: 60, bottom: 130, left: 80 }}
			padding={0.3}
			colors={{ scheme: 'set2' }}
			height={630}
			width={data.length * 50 + 100}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: -45,
				legend: 'GO Term',
				legendPosition: 'middle',
				legendOffset: 100,
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
							padding: '5px 9px',
							width: 300,
							textAlign: 'left'
						}}
					>
						<div
							style={{
								whiteSpace: 'pre',
								display: 'flex',
								alignItems: 'left'
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
							<div
								style={{
									display: 'flex',
									flexFlow: 'wrap'
								}}
							>
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
