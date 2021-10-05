import React, { useEffect, useState } from 'react';
import { getWidgets, queryData } from './query';
import PathwayTable from './components/PathwayTable';
import BarChart from './components/BarChart';
import WidgetList from './components/WidgetList';
// import FilterPanel from './components/FilterPanel';

const RootContainer = ({ service, entity }) => {
	// state variable to handle loading of data
	const [loading, setLoading] = useState(true);
	// state variable for the list of available enrichment widgets
	const [widgetList, setWidgetList] = useState([]);
	// // state variable for currently selected widget
	const [selectedWidget, setSelectedWidget] = useState({});
	// state variable for tracking of filtering options
	const filterOptions = {
		// const [filterOptions, setFilterOptions] = useState({
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni'
	};
	// pathway results (data) retrieved from the current widget
	const [pathways, setPathways] = useState([]);
	const [graphData, setGraphData] = useState([]);

	// executed on load
	// retrieve the list of enrichment widgets and initialize corresponding states
	useEffect(() => {
		getWidgets({ service })
			.then(res => {
				// filter out widgets that are not suitable for the type of list we are
				// handling
				const widgets = res.filter(
					w =>
						w.widgetType === 'enrichment' &&
						w.targets.indexOf(entity.Gene.class) !== -1
				);
				setWidgetList(widgets);
				// set the first widget of the list as selected, and fetch its data
				if (widgets.length) {
					const firstWidget = widgets[0];
					setSelectedWidget(firstWidget);
					getEnrichedPathways(firstWidget.name);
				}
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, []);

	// executed everytime pathways changes
	useEffect(() => {
		let gData = [];
		pathways.forEach((d, i) => {
			console.log(i, d);
			// each bar in the bar graph needs a value
			let bar = {
				id: d.identifier,
				value: d.matches,
				tooltip: d.description
			};
			gData.push(bar);
		});
		console.log(gData);
		setGraphData(gData);
	}, [pathways]);

	// executed everytime filterOptions changes
	// useEffect(() => {
	// 	getEnrichedPathways(selectedWidget.name);
	// }, [filterOptions]);

	// executed everytime selectedWidget changes
	useEffect(() => {
		getEnrichedPathways(selectedWidget.name);
	}, [selectedWidget]);

	// function to retrieve the enriched pathways for the currently selected widget
	// with the currently selected filters
	const getEnrichedPathways = widget => {
		setLoading(true);
		setGraphData([]); // empty data for the graph, reloaded after setting pathways
		queryData({
			geneIds: entity.Gene.value,
			service,
			filterOptions,
			widget
		})
			.then(res => {
				setLoading(false);
				setPathways(res);
			})
			.catch(() => {
				setLoading(false);
				setPathways([]);
			});
	};

	return (
		<div className="rootContainer">
			<div className="listEnrichmentVisualizerGraph">
				<PathwayTable pathways={pathways} />
				<BarChart graphData={graphData} />
			</div>
			<div className="rightColumn">
				{loading ? (
					<h4 className="no-data">Loading...</h4>
				) : widgetList.length ? (
					<>
						<WidgetList
							widgets={widgetList}
							selectedWidget={selectedWidget}
							setSelectedWidget={setSelectedWidget}
						/>
						{/* <FilterPanel 
							filterOptions={filterOptions}
							setFilterOptions={setFilterOptions}
						/> */}
						<h5 className="report-item-heading">Choose Visualization</h5>
					</>
				) : (
					<h4 className="no-data">No enrichment widgets found</h4>
				)}
			</div>
		</div>
	);
};

export default RootContainer;
