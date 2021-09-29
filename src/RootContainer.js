import React, { useEffect, useState } from 'react';
import { getWidgets, queryData } from './query';
import PathwayTable from './components/PathwayTable';
// import BarChart from './components/BarChart';
import WidgetList from './components/WidgetList';
import FilterPanel from './components/FilterPanel';

const RootContainer = ({ service, entity }) => {
	// state variable to handle loading of data
	const [loading, setLoading] = useState(true);
	// state variable for tracking of filtering options
	// const [filterOptions, setFilterOptions] = useState({
	// 	maxp: 0.05,
	// 	processFilter: 'biological_process',
	// 	correction: 'Holm-Bonferroni'
	// });
	const filterOptions = {
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni'
	};
	// the list of enrichment widgets available and the one currently selected
	const [widgetList, setWidgetList] = useState([]);
	const [selectedWidget, setSelectedWidget] = useState({});
	// pathway results (data) retrieved from the current widget
	const [pathways, setPathways] = useState([]);
	// const [graphData, setGraphData] = useState([]);

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
					getEnrichedPathways(firstWidget.name);
					setSelectedWidget(firstWidget);
				}
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, []);

	// executed everytime pathways changes
	useEffect(() => {}, [pathways]);

	// function to retrieve the eriched pathways for the currently selected widget
	// with the currently selected filters
	const getEnrichedPathways = widget => {
		setLoading(true);
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
			});
	};

	return (
		<div className="rootContainer">
			<div className="listEnrichmentVisualizerGraph">
				<PathwayTable pathways={pathways} />
			</div>
			<div className="rightColumn">
				{loading ? (
					<h4 className="no-data">Loading...</h4>
				) : widgetList.length ? (
					<>
						<WidgetList
							list={widgetList}
							selectedWidget={selectedWidget}
							// changeEnrichment={e => changeEnrichment(JSON.parse(e.target.value))}
						/>
						<FilterPanel data={selectedWidget} filters={filterOptions} />
					</>
				) : (
					<h4 className="no-data">No enrichment widgets found</h4>
				)}
			</div>
		</div>
	);
};

export default RootContainer;
