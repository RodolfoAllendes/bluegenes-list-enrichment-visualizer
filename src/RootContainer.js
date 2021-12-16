import React, { useEffect, useState } from 'react';
import { queryAnnotationSize, queryEnrichmentData, queryGeneList, queryWidgets } from './query';
import OrganismPanel from './components/OrganismPanel';
import WidgetPanel from './components/WidgetPanel';
import OptionsPanel from './components/OptionsPanel';
import DisplayPanel from './components/DisplayPanel';
import PathwayTable from './components/PathwayTable';
import BarChart from './components/BarChart';

const RootContainer = ({ service, entity }) => {
	// hooks for background information required by the application
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
		console.log('useEffect mount');
		Promise.all([
			queryWidgets({ service, type: 'enrichment', cls: entity.Gene.class }),
			queryGeneList({	service, genes: entity.Gene.value, organism	})
		]).then(([widgets, genes]) => {
			setWidgetList(widgets);
			setWidget(widgets[0]);
			setGeneList(genes);
		});
	}, []);

	useEffect(() => {
		if( widget !== undefined ){
			console.log('useEffect widget', widget);
			queryAnnotationSize({ service, undefined, widget }).then(size => setGenomeAnnotationSize(size));
			if( geneList !== undefined && geneList.length > 0 )
				queryAnnotationSize({ service, ids:geneList, widget}).then(size => setListAnnotationSize(size));
			if( Object.prototype.hasOwnProperty.call(widget, 'filters') )
				setFilter(widget.filters.split(',')[0]);
			else
			queryEnrichmentData(
				{	service, ids: geneList, widget, correction, maxp, filter }
			).then(paths => setPathways(paths))
			.catch(()=> setPathways([]));
		}	
	}, [widget]);

	useEffect(() => {
		if( geneList!== undefined ){
			console.log('useEffect geneList', geneList);
			if( widget !== undefined && geneList.length > 0 ){
				queryAnnotationSize(
					{ service, ids:geneList, widget }
				).then(size => setListAnnotationSize(size));	
				queryEnrichmentData(
					{	service, ids: geneList, widget, correction, maxp, filter }
				).then(paths => setPathways(paths))
				.catch(()=> setPathways([]));
			}
		}
	}, [geneList]);

	useEffect(() => {	
		if( geneList !== undefined && geneList.length > 0 && widget !== undefined){
			console.log('useEffectcorrection/maxp/filter', geneList);
			queryEnrichmentData({	service, ids: geneList, widget, correction, maxp, filter })
			.then(ed =>	setPathways(ed))
			.catch(()=> setPathways([]))
			;
		}
	}, [correction, maxp, filter]);

	useEffect(() => {
		if( listAnnotationSize !== -1 && genomeAnnotationSize !== -1){

		 console.log('useEffect pathways', pathways);

		let gd = []
		pathways.map(p => {
			gd.push({
				'id': p.identifier,
				'matches': p.matches/listAnnotationSize,
				'background': p.populationAnnotationCount/genomeAnnotationSize
			});
		});
		setGraphData(gd);
	}
	}, [pathways]);

	useEffect(() => {
		console.log('useEffect organims', organism);
		if(widget !== undefined ){
			Promise.all([
				queryGeneList({ service, genes: entity.Gene.value, organism }),
				queryAnnotationSize({ service, undefined, widget  })
			]).then(([gl,as]) => {
				setGeneList(gl);
				setGenomeAnnotationSize(as);
			});
		}
		else
			queryGeneList({ service, genes: entity.Gene.value, organism }).then(gl => setGeneList(gl));
	}, [organism]);

	useEffect(() => {
		console.log('redraw', graphData);
	}, [graphData]);
	

	useEffect(() => {
		if( pathways.length > 0 ){
			let gd = [];
			pathways.map(p => {
				gd.push({
				'id': p.identifier,
				'matches': p.matches/listAnnotationSize,
				'background': p.populationAnnotationCount/genomeAnnotationSize
				});
			});
			setGraphData(gd);
		}
	}, [listAnnotationSize, genomeAnnotationSize]);

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

export default RootContainer