import React, { useEffect, useState } from 'react';
import { queryData, getWidgets } from './query';
import WidgetList from './components/WidgetList';

const RootContainer = ({ serviceUrl, entity }) => {
	const filterOptions = {
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni',
		limitResults: 20
	};
	const [data, setData] = useState([]);
	const [widgetList, setWidgetList] = useState([]);
	const [graphData, setGraphData] = useState([]);
	const [selectedWidget, setSelectedWidget] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getWidgets({ serviceUrl }).then(res => {
			const enrichmentWidgets = res.filter(w => w.widgetType === 'enrichment');
			setLoading(false);
			setWidgetList(enrichmentWidgets);
			if (enrichmentWidgets.length) {
				const firstWidget = enrichmentWidgets[0];
				getEnrichData(firstWidget.name);
				setSelectedWidget(firstWidget);
			}
		});
	}, []);

	const getEnrichData = widget => {
		queryData({
			serviceUrl,
			geneIds: entity.value,
			filterOptions,
			widget
		})
			.then(res => {
				setLoading(false);
				setData(res.slice(0, filterOptions.limitResults));
			})
			.catch(() => {
				setLoading(false);
			});
	};

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
			<span className="chart-title">Enrichment Visualisation</span>
			{loading ? (
				<h1>Loading...</h1>
			) : widgetList.length ? (
				<WidgetList list={widgetList} selectedWidget={selectedWidget} />
			) : (
				<h1>No Enrichments found!</h1>
			)}
		</div>
	);
};

export default RootContainer;
