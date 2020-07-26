import React, { useEffect, useState } from 'react';
import queryData from './query';
import BarChart from './components/BarChart';

const RootContainer = ({ serviceUrl, entity }) => {
	const filterOptions = {
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni',
		limitResults: 20,
		widget: 'go_enrichment_for_gene'
	};
	const [data, setData] = useState([]);
	const [graphData, setGraphData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		queryData({
			serviceUrl,
			geneIds: entity.value,
			filterOptions
		})
			.then(res => {
				setLoading(false);
				setData(res.slice(0, filterOptions.limitResults));
			})
			.catch(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const graphData = [];
		data.forEach((d, indx) => {
			graphData.push({
				GoTerm:
					indx +
					'$' +
					d.description.slice(0, 17) +
					(d.description.length > 17 ? '...' : ''),
				value: d.matches,
				tooltip: d
			});
		});
		setGraphData(graphData);
	}, [data]);
	return (
		<div className="rootContainer">
			<span className="chart-title">
				GO Term Vs Gene Count Enrichment Visualizer
			</span>
			{loading ? (
				<h1>Loading...</h1>
			) : graphData.length ? (
				<BarChart data={graphData} />
			) : (
				<h1>No Enrichment data found!</h1>
			)}
		</div>
	);
};

export default RootContainer;
