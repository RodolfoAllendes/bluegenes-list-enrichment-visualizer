import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveHeatMap } from '@nivo/heatmap';

const BarChart = ({ graphData, graphType, keys }) => {
	return (
		<>
			{graphType === 'bar' ? (
				<ResponsiveBar
					data={graphData}
					indexBy="id"
					keys={['matches', 'background']}
					margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
					colors={{ scheme: 'nivo' }}
					groupMode='grouped'
					borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'country',
						legendPosition: 'middle',
						legendOffset: 32
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						tickValues: 5,
						legend: 'Proportion of assigned genes (%)',
						legendPosition: 'middle',
						legendOffset: -40
					}}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
					legends={[
						{
							dataFrom: 'keys',
							anchor: 'bottom-right',
							direction: 'column',
							justify: false,
							translateX: 120,
							translateY: 0,
							itemsSpacing: 2,
							itemWidth: 100,
							itemHeight: 20,
							itemDirection: 'left-to-right',
							itemOpacity: 0.85,
							symbolSize: 20,
							effects: [
								{
									on: 'hover',
									style: {
										itemOpacity: 1
									}
								}
							]
						}
					]}
				/>
			) : (
				<ResponsiveHeatMap
					data={graphData}
					keys={keys}
					indexBy="id"
					margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
					forceSquare={true}
					axisTop={{
						orient: 'top',
						tickSize: 5,
						tickPadding: 5,
						tickRotation: -90,
						legend: '',
						legendOffset: 36
					}}
					axisRight={null}
					axisBottom={null}
					axisLeft={{
						orient: 'left',
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'country',
						legendPosition: 'middle',
						legendOffset: -40
					}}
					cellOpacity={1}
					cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
					labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
					defs={[
						{
							id: 'lines',
							type: 'patternLines',
							background: 'inherit',
							color: 'rgba(0, 0, 0, 0.1)',
							rotation: -45,
							lineWidth: 4,
							spacing: 7
						}
					]}
					fill={[{ id: 'lines' }]}
					animate={true}
					motionConfig="wobbly"
					motionStiffness={80}
					motionDamping={9}
					hoverTarget="cell"
					cellHoverOthersOpacity={0.25}
				/>
			)}
			;
		</>
	);
};

export default BarChart;
