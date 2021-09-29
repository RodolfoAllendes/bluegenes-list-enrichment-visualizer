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
				if (res.length === 0) reject('No enrichment data found!');
				resolve(res);
			})
			.catch(() => reject('No enrichment data found!'));
	});
};

export { queryData, getWidgets };
