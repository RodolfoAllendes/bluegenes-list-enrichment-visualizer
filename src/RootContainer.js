import React, { useEffect, useState } from 'react';
import { getWidgets, getGeneList, queryData } from './query';
import OrganismPanel from './components/OrganismPanel';
import WidgetPanel from './components/WidgetPanel';
import FilterPanel from './components/FilterPanel';
import DisplayPanel from './components/DisplayPanel';
import PathwayTable from './components/PathwayTable';
import BarChart from './components/BarChart';

const RootContainer = ({ service, entity }) => {
	
	const [selectedOrganism, setSelectedOrganism] = useState('H. sapiens');
	const [geneList, setGeneList] = useState(undefined);
	const [selectedWidget, setSelectedWidget] = useState(undefined);
	const [filterOptions, setFilterOptions] = useState({
		maxp: 0.05,	processFilter: '', correction: 'Holm-Bonferroni'
	});
	const [pathways, setPathways] = useState([]);
	const [graphType, setGraphType] = useState('bar');
	const [graphData, setGraphData] = useState([]);


	// executed after initial rendering
	useEffect(() => {
		Promise.all([
			// make the initial filtering of the gene list according to default organism
			getGeneList({
				service,
				genes: entity.Gene.value,
				organism: selectedOrganism
			}),
			// and get a list of enrichment widgets from the backend
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

	// handle changes in state for selectedOrganism
	useEffect(() => {
		getGeneList({
			service,
			genes: entity.Gene.value,
			organism: selectedOrganism
		}).then(res => setGeneList(res));
	}, [selectedOrganism]);

	// handle changes in the state of the
	// geneList, selectedWidget or filterOptions
	useEffect(() => {
		// only retrieve enrichment results if the list and selected widgets are defined
		if(geneList !== undefined && selectedWidget !== undefined){
			
			getEnrichedPathways(selectedWidget.name);
		}
	}, [geneList, selectedWidget, filterOptions]);

	// handle the list of enrichment widgets - only modified at load time
	const [widgetList, setWidgetList] = useState([]);
	
	useEffect(() => {
		if (selectedWidget !== undefined) {
			getEnrichedPathways(selectedWidget.name);
			document
				.querySelector('select#processFilter')
				.dispatchEvent(new Event('change', { bubbles: true }));
		}
	}, [selectedWidget]);

	
	
	
	const getEnrichedPathways = widget => {
		 // empty data for the graph, reloaded after setting pathways
		if(geneList.length === 0){
			setPathways([]);
			setGraphData([]);
			return;
		}

		queryData({
			geneIds: geneList,
			service,
			filterOptions,
			widget
		}).then(res => {
			let gd = [];
			res.forEach(p => {
				gd.push({
					id: p.identifier,
					matches: p.matches // need to calculate the proper data
				});
			});
			setGraphData(gd);
			setPathways(res);
		}).catch(() => {
			setPathways([]);
			setGraphData([]);
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
				<PathwayTable pathways={pathways} />
			</div>
			<div className="listEnrichmentVisualizerGraph">
					<BarChart graphData={graphData} graphType={graphType} />
				</div>
		</div>
	);
};

export default RootContainer;
