import React from 'react';
// import { useEffect, useState } from 'react';

// Definition of the FilterPanel Component
// data
const FilterPanel = () => {
	const correctionValues = [
		'Holm-Bonferroni',
		'Benjamini Hochberg',
		'Bonferroni'
	];

	return (
		<div className="filter-panel">
			<div className="filter-container">
				<h5 className="report-item-heading">Widget Filters</h5>
				<p>Test Correction:</p>
				<div className="control">
					<select name="correction">
						{correctionValues.map(c => (
							<option value={c} key={c}>
								{c}
							</option>
						))}
					</select>
				</div>
				<p>Max p-value:</p>
				<p>Filter</p>
				<button className="apply-filters-button">Apply</button>
			</div>
		</div>
	);
};

export default FilterPanel;
