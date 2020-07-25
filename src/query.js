import imjs from 'imjs';

const queryData = ({
	geneIds,
	serviceUrl,
	filterOptions,
	imjsClient = imjs
}) => {
	const service = new imjsClient.Service({
		root: serviceUrl
	});
	return new Promise((resolve, reject) => {
		service
			.enrichment({
				ids: geneIds,
				widget: filterOptions['widget'],
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

export default queryData;
