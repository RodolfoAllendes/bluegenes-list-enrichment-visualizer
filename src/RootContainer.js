import React, { useEffect, useState } from 'react';
import queryData from './query';

const RootContainer = ({ serviceUrl, entity }) => {
	const [filterOptions, setFilterOptions] = useState({
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni',
		limitResults: 20,
		widget: 'go_enrichment_for_gene'
	});

	useEffect(() => {
		queryData({
			serviceUrl,
			geneIds: entity.value,
			filterOptions
		})
			.then(res => {
				console.log(res);
			})
			.catch(() => {
				console.log('No Enrichment data found!');
			});
	}, [filterOptions]);
	return (
		<div className="rootContainer">
			<h1>Your Data Viz Here</h1>
		</div>
	);
};

export default RootContainer;
