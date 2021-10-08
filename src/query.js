/**
 * Filter the list of genes to include only elements that belong to the
 * specified organism
 * @param {Object} service object describing an intermine service
 * @param {Array<Number>} genes the complete list of genes
 * @param {String} organism the target organism used to filter the list of genes
 */
const getGeneList = ({ service, genes, organism }) => {
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
		tmService
			.records(query)
			.then(res => {
				let g = [];
				res.map(item => g.push(item.objectId));
				resolve(g);
			})
			.catch(() => reject('No matching IDs'));
	});
};

const getWidgets = ({ service }) => {
	const tmService = new imjs.Service(service);
	return new Promise((resolve, reject) => {
		tmService
			.fetchWidgets()
			.then(res => {
				if (res.length === 0) reject('No widgets data found!');
				resolve(res);
			})
			.catch(() => reject('No widgets data found!'));
	});
};

const queryData = ({ geneIds, service, filterOptions, widget }) => {
	const tmService = new imjs.Service(service);
	return new Promise((resolve, reject) => {
		tmService
			.enrichment({
				ids: geneIds,
				widget: widget,
				maxp: filterOptions['maxp'],
				filter: filterOptions['processFilter'], // can also be cellular_component or molecular_function
				correction: filterOptions['correction']
			})
			.then(res => {
				if (res === 0) reject('No enrichment data found!');
				resolve(res);
			})
			.catch(() => reject('No enrichment data found!'));
	});
};

export { getWidgets, getGeneList, queryData };
