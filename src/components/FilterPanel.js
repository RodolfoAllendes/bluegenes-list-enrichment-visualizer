import React, { useState } from 'react';

const FilterPanel = ({ selectedWidget, filterOptions, setFilterOptions }) => {
	const correctionValues = [
		'Holm-Bonferroni',
		'Benjamini Hochberg',
		'Bonferroni',
		'None'
	];

	const [maxp, setMaxp] = useState(filterOptions.maxp);

	const handleChange = ev => {
		const { name, value } = ev.target;
		setFilterOptions({
			...filterOptions,
			[name]: name == 'maxp' ? Number(value) : value
		});
	};

	const handleInput = ev => {
		const { value } = ev.target;
		console.log(value);
		if (value >= 0 && value <= 1) setMaxp(value);
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
						selected={filterOptions['correction'] === c}
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
				onInput={handleInput}
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
						selectedWidget &&
						Object.prototype.hasOwnProperty.call(selectedWidget, 'filters')
					)
				}
			>
				{selectedWidget &&
				Object.prototype.hasOwnProperty.call(selectedWidget, 'filters') ? (
					selectedWidget.filters.split(',').map(f => (
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
