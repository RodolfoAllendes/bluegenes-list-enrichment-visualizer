import React, { useEffect, useState } from 'react';
import { queryData, getWidgets } from './query';
import WidgetList from './components/WidgetList';
import BarChart from './components/BarChart';
import FilterPanel from './components/FilterPanel';

const RootContainer = ({ serviceUrl, entity }) => {
	const [filterOptions, setFilterOptions] = useState({
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni',
		limitResults: 20
	});
	const [data, setData] = useState([]);
	const [widgetList, setWidgetList] = useState([]);
	const [graphData, setGraphData] = useState([]);
	const [selectedWidget, setSelectedWidget] = useState({});
	const [loading, setLoading] = useState(false);
	const [chartLoading, setChartLoading] = useState(false);
	const [maxResultLimit, setMaxLimit] = useState(0);

	useEffect(() => {
		setLoading(true);
		getWidgets({ serviceUrl })
			.then(res => {
				const enrichmentWidgets = res.filter(
					w =>
						w.widgetType === 'enrichment' &&
						w.targets.indexOf(entity.class) !== -1
				);
				setLoading(false);
				setWidgetList(enrichmentWidgets);
				if (enrichmentWidgets.length) {
					const firstWidget = enrichmentWidgets[0];
					getEnrichData(firstWidget.name);
					setSelectedWidget(firstWidget);
				}
			})
			.catch(() => setLoading(false));
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

	const getEnrichData = widget => {
		setChartLoading(true);
		setGraphData([]);
		queryData({
			serviceUrl,
			geneIds: entity.value,
			filterOptions,
			widget
		})
			.then(res => {
				setMaxLimit(res.length);
				setData(res.slice(0, filterOptions.limitResults));
				setChartLoading(false);
			})
			.catch(() => {
				setChartLoading(false);
			});
	};

	const changeEnrichment = widget => {
		setSelectedWidget(widget);
		getEnrichData(widget.name);
	};

	const updateFilter = ev => {
		const { name, value } = ev.target;
		setFilterOptions({
			...filterOptions,
			[name]:
				['maxp', 'limitResults'].indexOf(name) !== -1 ? Number(value) : value
		});
	};

	return (
		<div className="rootContainer">
			<span className="chart-title">Enrichment Visualisation</span>
			{loading ? (
				<h1>Loading...</h1>
			) : widgetList.length ? (
				<div>
					<WidgetList
						list={widgetList}
						selectedWidget={selectedWidget}
						changeEnrichment={e => changeEnrichment(JSON.parse(e.target.value))}
					/>
					{!chartLoading ? (
						graphData.length ? (
							<div className="graph-container">
								<BarChart data={graphData} />
								<FilterPanel
									data={selectedWidget}
									applyFilters={() => getEnrichData(selectedWidget.name)}
									updateFilter={updateFilter}
									filters={filterOptions}
									maxLimit={maxResultLimit}
								/>
							</div>
						) : (
							<h2>No Enrichment Data Found!</h2>
						)
					) : (
						<h1>Loading chart...</h1>
					)}
				</div>
			) : (
				<h1>No Enrichments found!</h1>
			)}
		</div>
	);
};

export default RootContainer;
