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

	useEffect(() => {	
		if( geneList !== undefined && geneList.length > 0 && widget !== undefined){
			console.log('useEffect genelist/correction/maxp/filter', geneList);
			Promise.all([
				queryAnnotationSize({ service, ids: geneList, widget }),
				queryEnrichmentData({	service, ids: geneList, widget, correction, maxp, filter })
			]).then(([as, ed]) => {
				setListAnnotationSize(as);
				setPathways(ed);
			}).catch(()=>{
				setListAnnotationSize(-1);
				setPathways([]);	
			});
		}
		else{
			setListAnnotationSize(-1);
			setPathways([]);
		}

	}, [geneList, correction, maxp, filter]);

	useEffect(() => {
		
	}, [listAnnotationSize]);

	useEffect(() => {
		
	}, [genomeAnnotationSize]);

	useEffect(() => {
		

	}, [pathways]);

	useEffect(() => {
		
	}, [graphData]);

	useEffect(() => {
		console.log('useEffect organims', organism);
		queryGeneList({ service, genes: entity.Gene.value, organism })
			.then(res => setGeneList(res));
	}, [organism]);

	useEffect(() => {

		// change the filter values (these depend on widget)
		if(widget && Object.prototype.hasOwnProperty.call(widget, 'filters')){
			console.log(widget.filters);
			setFilter(widget.filters.split(',')[0]);
		}

		// setFilter();
	// 	if(geneList !== undefined && geneList.length > 0 && widget !== undefined){
	// 		console.log('useEffect widget', widget);
	// 		Promise.all([
	// 			queryAnnotationSize({ service, ids: geneList, widget }),
	// 			queryEnrichmentData({	service, ids: geneList, widget, correction, maxp, filter })
	// 		]).then(([as,ed]) => {
	// 			setListAnnotationSize(as);
	// 			setPathways(ed)
	// 		}).catch(() => {
	// 			setListAnnotationSize(-1);
	// 			setPathways([]);
	// 		});
	// 	}
	// 	else{
	// 		setListAnnotationSize(-1);
	// 		setPathways([]);
	// 	}

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
					setCorrection={setCorrection}
					maxp={maxp}
					setMaxp={setMaxp}
					filter={filter}
					setFilter={setFilter}
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
