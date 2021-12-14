import React, { useEffect, useState } from 'react';
import { queryAnnotationSize, queryGenomeSize, queryEnrichmentData, queryGeneList, queryWidgets } from './query';
import OrganismPanel from './components/OrganismPanel';
import WidgetPanel from './components/WidgetPanel';
import OptionsPanel from './components/OptionsPanel';
import DisplayPanel from './components/DisplayPanel';
import PathwayTable from './components/PathwayTable';
import BarChart from './components/BarChart';

const RootContainer = ({ service, entity }) => {
	// hooks for background information required by the application
	const [genomeSize, setGenomeSize] = useState(-1);
	const [geneList, setGeneList] = useState(undefined);
	const [listAnnotationSize, setListAnnotationSize] = useState(-1);
	const [genomeAnnotationSize, setGenomeAnnotationSize] = useState(-1);
	const [pathways, setPathways] = useState([]);
	const [graphData, setGraphData] = useState([]);

	// hooks for user-defined interaction variables
	const [organism, setOrganism] = useState('H. sapiens');
	const [widget, setWidget] = useState(undefined);
	const [widgetList, setWidgetList] = useState([]);
	const [correction, setCorrection] = useState('Holm-Bonferroni');
	const [maxp, setMaxp] = useState(0.05);
	const [filter, setFilter] = useState('');
	const [graphType, setGraphType] = useState('bar');
	
	/**
	 * Call background information on loading of the application
	 */
	useEffect(() => {
		Promise.all([
			queryWidgets({ service, type: 'enrichment', cls: entity.Gene.class }),
			queryGenomeSize({ service }),
			queryGeneList({	service, genes: entity.Gene.value, organism	})
			// and get a list of enrichment widgets from the backend
		]).then(([widgets, genomeSize, genes]) => {
			// console.log('widgets', widgets);
			// console.log('genomeSize', genomeSize);
			// console.log('genes', genes);
			// setWidget(widgets[0]);
			setWidgetList(widgets);
			setGeneList(genes);
			setGenomeSize(genomeSize);
		});
	}, []);

	/* handle the change in genomeSize */
	useEffect(() => {
		console.log('useEffect genomeSize');
		// queryAnnotationSize({ service, undefined, widget })
	}, [genomeSize] );

	/**
	 * Handle changes in the list of available list of genes (geneList)
	 */
	useEffect(() => {
		console.log('useEffect geneList', geneList);
		if( geneList !== undefined && geneList.length > 0 && widget !== undefined){
			Promise.all([
				queryAnnotationSize({ service, ids: geneList, widget }),
				queryEnrichmentData({	service, ids: geneList, widget, correction, maxp, filter })
			]).then(([as, ed]) => {
				setListAnnotationSize(as);
				setPathways(ed);
			});
		}
		else{
			setPathways([]);
		}

	}, [geneList]);

	/**
	 * handle change in the number of annotated genes that belong to the list
	 */
	useEffect(() => {
		console.log('useEffect listAnnotationSize', listAnnotationSize);
		/* have to modify the graph */
	}, [listAnnotationSize]);

	/**
	 * handle change in the number of annotated genes in the whole genome
	 */
	useEffect(() => {
		console.log('useEffect genomeAnnotationSize', genomeAnnotationSize);
		/* have to change the graph */
	}, [genomeAnnotationSize]);

	/**
	 * handle the change in enriched elements
	 */
	useEffect(() => {
		console.log('useEffect pathways', pathways);

	}, [pathways]);

	/**
	 * Handle changes in the organism selected by the user
	 */
	// useEffect(() => {
	// 	queryGeneList({ service, genes: entity.Gene.value, organism })
	// 		.then(res => {
	// 			setGeneList(res)
	// 		});
	// }, [organism]);

	/**
	 * handle changes in the enrichment widget 
	 */ 
	useEffect(() => {
		console.log('useEffect setWidget', widget);
		// only retrieve enrichment results if the list and selected widgets are defined
		// if(geneList !== undefined && geneList.length !== 0 && widget !== undefined){
		// 	getListAnnotationSize(widget, filter);
		// 	getEnrichedPathways(widget);
		// }
	}, [widget]);

	useEffect(() => {
		if( widgetList.length > 0 )
			setWidget(widgetList[0]);
	}, [widgetList]);
	
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
				<OptionsPanel
					widget={widget}
					correction={correction}
					maxp={maxp}
					filter={filter}
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
