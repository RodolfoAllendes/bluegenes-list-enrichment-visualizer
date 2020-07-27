import imjs from 'imjs';

const getWidgets = ({ serviceUrl, imjsClient = imjs }) => {
	const service = new imjsClient.Service({
		root: serviceUrl
	});
	return new Promise((resolve, reject) => {
		service
			.fetchWidgets({
				format: 'json'
			})
			.then(res => {
				if (res.length === 0) reject('No widgets data found!');
				resolve(res);
			})
			.catch(() => reject('No widgets data found!'));
	});
};

const queryData = ({
	geneIds,
	serviceUrl,
	filterOptions,
	widget,
	imjsClient = imjs
}) => {
	const service = new imjsClient.Service({
		root: serviceUrl
	});
	return new Promise((resolve, reject) => {
		service
			.enrichment({
				ids: geneIds,
				widget: widget,
				maxp: filterOptions['maxp'],
				filter: filterOptions['processFilter'], // can also be cellular_component or molecular_function
				correction: filterOptions['correction']
			})
			.then(res => {
				if (res.length === 0) reject('No data found!');
				resolve(res);
			})
			.catch(() => reject('No data found!'));
	});
};

export { queryData, getWidgets };
