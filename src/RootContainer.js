import React, { useEffect, useState } from 'react';
import { getWidgets, getGeneList, queryData } from './query';
import OrganismPanel from './components/OrganismPanel';
import WidgetPanel from './components/WidgetPanel';
import FilterPanel from './components/FilterPanel';
import DisplayPanel from './components/DisplayPanel';
// import PathwayTable from './components/PathwayTable';
// import BarChart from './components/BarChart';

const RootContainer = ({ service, entity }) => {
	const [selectedOrganism, setSelectedOrganism] = useState('H. sapiens');
	const [geneList, setGeneList] = useState([]);

	const [widgetList, setWidgetList] = useState([]);
	const [selectedWidget, setSelectedWidget] = useState(undefined);
	const [filterOptions, setFilterOptions] = useState({
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni'
	});

	const [pathways, setPathways] = useState([]);
	const [graphType, setGraphType] = useState('bar');
	const [graphData, setGraphData] = useState([]);

	// executed after initial rendering
	// retrieve the list of enrichment widgets and initialize corresponding states
	useEffect(() => {
		Promise.all([
			getGeneList({
				service,
				genes: entity.Gene.value,
				organism: selectedOrganism
			}),
			getWidgets({ service })
		]).then(([geneList, widgets]) => {
			let filteredWidgets = widgets.filter(
				w =>
					w.widgetType === 'enrichment' &&
					w.targets.indexOf(entity.Gene.class) !== -1
			);
			setGeneList(geneList);
			setSelectedWidget(filteredWidgets[0]);
			setWidgetList(filteredWidgets);
		});
	}, []);

	// executed everytime the target organism changes
	useEffect(() => {
		getGeneList({
			service,
			genes: entity.Gene.value,
			organism: selectedOrganism
		}).then(res => setGeneList(res));
	}, [selectedOrganism]);

	// executed everytime selectedWidget changes
	useEffect(() => {
		if (selectedWidget !== undefined) {
			getEnrichedPathways(selectedWidget.name);
			document
				.querySelector('select#processFilter')
				.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}, [selectedWidget]);

	// executed everytime pathways changes
	// useEffect(() => {
	// 	let gData = [];
	// 	pathways.forEach((d, i) => {
	// 		// each bar in the bar graph needs a value
	// 		let bar = {
	// 			id: d.identifier,
	// 			value: d.matches,
	// 			tooltip: d.description
	// 		};
	// 		gData.push(bar);
	// 	});
	// 	setGraphData(gData);
	// }, [pathways]);

	const getEnrichedPathways = widget => {
		setGraphData([]); // empty data for the graph, reloaded after setting pathways
		queryData({
			geneIds: geneList,
			service,
			filterOptions,
			widget
		})
			.then(res => {
				setPathways(res);
			})
			.catch(() => {
				setPathways([]);
			});
	};

	return (
		<div className="rootContainer">
			<div className="listEnrichmentVisualizerControls">
				<OrganismPanel
					selectedOrganism={selectedOrganism}
					setSelectedOrganism={setSelectedOrganism}
				/>
				<WidgetPanel
					widgets={widgetList}
					selectedWidget={selectedWidget}
					setSelectedWidget={setSelectedWidget}
				/>
				<FilterPanel
					selectedWidget={selectedWidget}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
				/>
				<DisplayPanel graphType={graphType} setGraphType={setGraphType} />
				{/* <PathwayTable pathways={pathways} /> */}
			</div>
			{/* <div className="listEnrichmentVisualizerGraph">
					<BarChart graphData={graphData} graphType={graphType} />
				</div> */}
		</div>
	);
};

export default RootContainer;
