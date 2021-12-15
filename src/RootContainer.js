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
	
	useEffect(() => {
		Promise.all([
			queryWidgets({ service, type: 'enrichment', cls: entity.Gene.class }),
			queryGenomeSize({ service }),
			queryGeneList({	service, genes: entity.Gene.value, organism	})
			// and get a list of enrichment widgets from the backend
		]).then(([widgets, genomeSize, genes]) => {
			setWidgetList(widgets);
			setGeneList(genes);
			setGenomeSize(genomeSize);
		});
	}, []);

	useEffect(() => {
		// queryAnnotationSize({ service, undefined, widget })
	}, [genomeSize] );

	// useEffect(() => {
	// 	if( geneList !== undefined && geneList.length > 0 && widget !== undefined){
	// 		Promise.all([
	// 			queryAnnotationSize({ service, ids: geneList, widget }),
	// 			queryEnrichmentData({	service, ids: geneList, widget, correction, maxp, filter })
	// 		]).then(([as, ed]) => {
	// 			setListAnnotationSize(as);
	// 			setPathways(ed);
	// 		});
	// 	}
	// 	else{
	// 		setPathways([]);
	// 	}

	// }, [geneList]);

	useEffect(() => {
		
	}, [listAnnotationSize]);

	useEffect(() => {
		
	}, [genomeAnnotationSize]);

	useEffect(() => {
		

	}, [pathways]);

	// useEffect(() => {
	// 	queryGeneList({ service, genes: entity.Gene.value, organism })
	// 		.then(res => {
	// 			setGeneList(res)
	// 		});
	// }, [organism]);

	useEffect(() => {
		if(geneList !== undefined && widget !== undefined){
			console.log(geneList);
			queryEnrichmentData({	service, ids: geneList, widget, correction, maxp, filter })
				.then(ed => setPathways(ed));
		}
	}, [widget]);

	useEffect(() => {
		if( widgetList.length > 0 )
			setWidget(widgetList[0]);
	}, [widgetList]);
	
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
	)
};

export default RootContainer;
