import React from 'react';

const FilterPanel = ({ filterOptions, setFilterOptions }) => {
	const correctionValues = [
		'Holm-Bonferroni',
		'Benjamini Hochberg',
		'Bonferroni',
		'None'
	];

	return (
		<div className="im-table relative">
			<div className="dashboard">
				<div className="pagination-bar">
					<label className="pagination-label">Enrichment Options:</label>
					<div className="btn-toolbar pagination-buttons">
						<div className="btn-group">
							<label>Test Correction:</label>
							<select
								name="correction"
								value={filterOptions['correction']}
								onChange={ev => {
									const { name, value } = ev.target;
									let newOpts = filterOptions;
									newOpts['name'] = name === 'maxp' ? Number(value) : value;
									setFilterOptions(newOpts);
									// {
									// 	...filterOptions,
									// 	[name]:
									// });
								}}
							>
								{correctionValues.map(c => (
									<option value={c} key={c}>
										{c}
									</option>
								))}
							</select>
						</div>
						<div className="btn-group">
							<label>Max p-value:</label>
						</div>
						<div className="btn-group">
							<label>Filter</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterPanel;
