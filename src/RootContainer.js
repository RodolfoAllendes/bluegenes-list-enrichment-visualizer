import React, { useEffect, useState } from 'react';
import { queryAnnotationSize, queryGenomeSize, queryEnrichmentData, queryGeneList, queryWidgets } from './query';
import OrganismPanel from './components/OrganismPanel';
import WidgetPanel from './components/WidgetPanel';
import FilterPanel from './components/FilterPanel';
import DisplayPanel from './components/DisplayPanel';
import PathwayTable from './components/PathwayTable';
import BarChart from './components/BarChart';

const RootContainer = ({ service, entity }) => {
	// private information holders 
	const _widgetList = [];
	// hooks for background information required by the application
	const widgetList = [];
	const [genomeSize, setGenomeSize] = useState(-1);
	const [geneList, setGeneList] = useState(undefined);
	const [listAnnotationSize, setListAnnotationSize] = useState(-1);
	const [genomeAnnotationSize, setGenomeAnnotationSize] = useState(-1);
	const [pathways, setPathways] = useState([]);
	const [graphData, setGraphData] = useState([]);

	// hooks for user-defined interaction variables
	const [organism, setOrganism] = useState('H. sapiens');
	const [widget, setWidget] = useState(undefined);
	const [correction, setCorrection] = useState('Holm-Bonferroni');
	const [maxp, setMaxp] = useState(0.05);
	const [filter, setFilter] = useState('');
	const [graphType, setGraphType] = useState('bar');
	
	/**
	 * Call background information on loading of the application
	 */
	useEffect(() => {
		Promise.all([
			queryWidgets({ service }),
			queryGenomeSize({ service }),
			queryGeneList({	service, genes: entity.Gene.value, organism	})
			// and get a list of enrichment widgets from the backend
		]).then(([widgets, genomeSize, genes]) => {
			let filteredWidgets = widgets.filter(
				w =>
					w.widgetType === 'enrichment' &&
					w.targets.indexOf(entity.Gene.class) !== -1
			);
			setWidget(filteredWidgets[0]);
			setWidgetList(filteredWidgets);
			setGeneList(genes);
			setGenomeSize(genomeSize);
		});
	}, []);

	/**
	 * Handle changes in the list of available list of genes (geneList). The
	 * following changes need to be accounted for:
	 * 1. number of genes in the list annotated for the current widget
	 * 2. number of genes in the background annotated for the current widget
	 * 3. the enriched elements for the current widget 
	 */
	useEffect(() => {
		console.log('useEffect geneList');
		if(geneList !== undefined && widget !== undefined){
			getListAnnotationSize(geneList)
			getGenomeAnnotationSize()
				.then((rdyGenome) => {
					console.log(rdyGenome);
					getEnrichedElements(geneList);
				});
		}
	}, [geneList]);

	/**
	 * Handle changes in the organism selected by the user
	 */
	// useEffect(() => {
	// 	queryGeneList({ service, genes: entity.Gene.value, organism })
	// 		.then(res => {
	// 			setGeneList(res)
	// 		});
	// }, [organism]);

	// /**
	//  * handle changes in the enrichment widget 
	//  */ 
	// useEffect(() => {
	// 	// only retrieve enrichment results if the list and selected widgets are defined
	// 	if(geneList !== undefined && geneList.length !== 0 && widget !== undefined){
	// 		getListAnnotationSize(widget, filter);
	// 		// getEnrichedPathways(selectedWidget);
	// 	}
	// }, [widget]);
	
	// /**
	//  * 
	//  */
	// useEffect(() => {
	// 	if (selectedWidget !== undefined) {
	// 		getEnrichedPathways(selectedWidget);
	// 		document
	// 			.querySelector('select#processFilter')
	// 			.dispatchEvent(new Event('change', { bubbles: true }));
	// 	}
	// }, [selectedWidget]);

	/**
	 * @param {Object} widget
	 * @param {String} filter 
	 * @returns 
	 */
	const getListAnnotationSize = ids => {
		queryAnnotationSize({ service, ids, widget })
			.then(size => setListAnnotationSize(size))
			.catch(() => setListAnnotationSize(-1));
	}

	const getGenomeAnnotationSize = () => {
		return new Promise((resolve, reject) => {
			queryAnnotationSize({ service, undefined, widget })
				.then(size => {
					setGenomeAnnotationSize(size);
					resolve(true);
				})
				.catch(() => {
					setGenomeAnnotationSize(-1);
					reject(false);
				});
		});
	}

	/**
	 * 
	 * @param {*} widget 
	 * @returns 
	 */
	const getEnrichedElements = ids => {
		 // empty data for the graph, reloaded after setting pathways
		if(ids === undefined || ids.length === 0){
			setPathways([]);
			setGraphData([]);
			return;
		}
		queryEnrichmentData({	service, ids, widget, correction, maxp, filter	})
			.then(data => {
				console.log(data);
				let gd = [];
				data.forEach(p => {
				gd.push({
					id: p.identifier,
					matches: p.matches/listAnnotationSize, // need to calculate the proper data
					background: genomeAnnotationSize/genomeSize
				});
			});
			setGraphData(gd);
			setPathways(data);
		}).catch(() => {
			setPathways([]);
			setGraphData([]);
		});
	};

	return (
		<div className="rootContainer">
			<div className="listEnrichmentVisualizerControls">
				<OrganismPanel
					organism={organism}
					setOrganism={setOrganism}
				/>
				<WidgetPanel
					widgetList={widgetList}
					widget={widget}
					setWidget={setWidget}
				/>
				{/* <FilterPanel
					widget={widget}
					correction={correction}
					maxp={maxp}
					filter={filter}
				/>
				<DisplayPanel graphType={graphType} setGraphType={setGraphType} />
				<PathwayTable pathways={pathways} /> */}
			</div>
			<div className="listEnrichmentVisualizerGraph">
					<BarChart graphData={graphData} graphType={graphType} />
				</div>
		</div>
	);
};

export default RootContainer;
