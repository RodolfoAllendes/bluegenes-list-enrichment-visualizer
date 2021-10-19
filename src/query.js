/**
 * 
 * @param {*} param0 
 * @returns 
 */
const queryAnnotationSize = ({ service, ids, widget }) => {
	const tmService = new imjs.Service(service);
	let query = {
		from: 'Gene',
		select: ['primaryIdentifier'],
	
	};
	if (ids!== undefined){
		query['where'] = [
			{	path: widget.enrichIdentifier, op:'IS NOT NULL', values: 'IS NOT NULL', code: 'A'},
			{ path: 'id', op: 'one of', values: ids, code: 'B' }
		];
		query['constraintLogic'] = 'A and B';
	}
	else{
		query['where'] = [{ path: widget.enrichIdentifier, op:'IS NOT NULL', values: 'IS NOT NULL', code: 'A'}];
	}

	return new Promise((resolve, reject) => {
		tmService.count(query)
			.then(size => resolve(size))
			.catch(() => reject(-1));
	});
}

/**
 * 
 */
const queryGenomeSize = ({ service }) => {
	const tmService = new imjs.Service(service);
	let backgroundSizeQuery = {
		from: 'Gene',
		select: ['primaryIdentifier'],
	};
	return new Promise((resolve, reject) =>{
		tmService.count(backgroundSizeQuery)
			.then(size => resolve(size))
			.catch(() => reject(-1));
	});
}

/**
 * @param {Object} service
 * @param {Array<Number>} ids
 * @param {Object} widget 
 * @param {Object} filterOptions
 * @returns Promise 
 */
 const queryEnrichmentData = ({ service, ids, widget, correction, maxp, filter }) => {
	const tmService = new imjs.Service(service);
	let enrichQuery = {	ids, widget: widget.name, maxp, correction, filter, correction };
	return new Promise((resolve, reject) => {
		tmService.enrichment(enrichQuery)
			.then(data => resolve(data))
			.catch(() => reject('No enrichment data found!'));
	});
};
/**
 * Filter the list of genes to include only elements that belong to the
 * specified organism
 * @param {Object} service object describing an intermine service
 * @param {Array<Number>} genes the complete list of genes
 * @param {String} organism the target organism used to filter the list of genes
 */
const queryGeneList = ({ service, genes, organism }) => {
	const tmService = new imjs.Service(service);
	const query = {
		from: 'Gene',
		select: ['id'],
		where: [
			{ path: 'id', op: 'one of', values: genes, code: 'A' },
			{ path: 'organism.shortName', op: '=', value: organism, code: 'B' }
		],
		constraintLogic: 'A and B'
	};
	return new Promise((resolve, reject) => {
		tmService.records(query)
			.then(res => {
				let g = [];
				res.map(item => g.push(item.objectId));
				resolve(g);
			})
			.catch(() => reject('No matching IDs'));
	});
};

const queryWidgets = ({ service }) => {
	const tmService = new imjs.Service(service);
	return new Promise((resolve, reject) => {
		tmService.fetchWidgets()
			.then(res => {
				if (res.length === 0) reject('No widgets data found!');
				resolve(res);
			})
			.catch(() => reject('No widgets data found!'));
	});
};



export { queryAnnotationSize, queryEnrichmentData, queryGeneList, queryGenomeSize, queryWidgets };
