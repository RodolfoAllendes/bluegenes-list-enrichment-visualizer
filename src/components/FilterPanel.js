import React from 'react';

const FilterPanel = () => {
	return (
		<div className="filter-panel">
			<div className="title">Filter Panel</div>
			<div className="filter-container">
				<p>Test Correction:</p>
				<div className="control">
					<select name="correction">
						<option value="Holm-Bonferroni">Holm-Bonferroni</option>
						<option value="Benjamini Hochberg">Benjamini Hochberg</option>
						<option value="Bonferroni">Bonferroni</option>
					</select>
				</div>
			</div>
			<div className="filter-container">
				<p>Max p-value:</p>
				<div className="control">
					<select name="maxp">
						<option value={0.05}>0.05</option>
						<option value={0.1}>0.10</option>
						<option value={1.0}>1.00</option>
					</select>
				</div>
			</div>
			<div className="filter-container">
				<p>Ontology:</p>
				<div className="control">
					<select name="processFilter">
						<option value="biological_process">biological_process</option>
						<option value="cellular_process">cellular_process</option>
						<option value="molecular_function">molecular_function</option>
					</select>
				</div>
			</div>
			<div className="filter-container">
				<p>Results length:</p>
				<div className="control">
					<input
						type="number"
						name="limitResults"
						placeholder="Limit Results"
					/>
				</div>
			</div>
		</div>
	);
};

export default FilterPanel;
