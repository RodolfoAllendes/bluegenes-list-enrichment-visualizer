import React, { useState } from 'react';

const FilterPanel = ({ widget, correction, maxp, filter }) => {
	const correctionValues = [
		'Holm-Bonferroni',
		'Benjamini Hochberg',
		'Bonferroni',
		'None'
	];

	const handleChange = ev => {
		const { name, value } = ev.target;
		setFilterOptions({
			...filterOptions,
			[name]: name === 'maxp' ? Number(value) : value
		});
	};

	return (
		<div className="singleControl">
			<label className="pagination-label">Enrichment Options:</label>
			<span>Test Correction:</span>
			<select
				className="form-control input-sm"
				name={'correction'}
				onChange={handleChange}
			>
				{correctionValues.map(c => (
					<option
						key={c}
						value={c}
						selected={correction === c}
					>
						{c}
					</option>
				))}
			</select>

			<span>Max p-value:</span>
			<input
				className="form-control"
				name="maxp"
				type="number"
				value={maxp}
				min="0"
				max="1"
				step={0.01}
				precision={2}
				onChange={handleChange}
			/>

			<span>Filter</span>
			<select
				className="form-control input-sm"
				id={'processFilter'}
				name={'processFilter'}
				onChange={handleChange}
				disabled={
					!(
						widget &&
						Object.prototype.hasOwnProperty.call(widget, 'filters')
					)
				}
			>
				{widget &&
				Object.prototype.hasOwnProperty.call(widget, 'filters') ? (
					widget.filters.split(',').map(f => (
						<option key={f} value={f}>
							{f}
							</option>
					))
					) : (
					<></>
					)}
			</select>
		</div>
	);
};

export default FilterPanel;
