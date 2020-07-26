import React, { useEffect, useState } from 'react';
import queryData from './query';

const RootContainer = ({ serviceUrl, entity }) => {
	const filterOptions = {
		maxp: 0.05,
		processFilter: 'biological_process',
		correction: 'Holm-Bonferroni',
		limitResults: 20,
		widget: 'go_enrichment_for_gene'
	};
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		queryData({
			serviceUrl,
			geneIds: entity.value,
			filterOptions
		})
			.then(res => {
				setLoading(false);
				setData(res.slice(0, filterOptions.limitResults));
			})
			.catch(() => {
				setLoading(false);
			});
	}, []);
	return (
		<div className="rootContainer">
			{loading ? (
				<h1>Loading...</h1>
			) : data.length ? (
				<div></div>
			) : (
				<h1>No Enrichment data found!</h1>
			)}
		</div>
	);
};

export default RootContainer;
