import React from 'react';

const OptionsPanel = ({ 
	widget, 
	correction, setCorrection,
	maxp, setMaxp, 
	filter, setFilter
}) => {
	// valid correction values in TargetMine
	const correctionValues = [
		'Holm-Bonferroni',
		'Benjamini Hochberg',
		'Bonferroni',
		'None'
	];
	// handle the change in correction
	const handleCorrectionChange = ev => {
		const { value } = ev.target;
		setCorrection(value);
	};
	// handle change in maxp value
	const handleMaxpChange = ev =>{
		let { value, min, max } = ev.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
		setMaxp(value);
		console.log(value);
	}
	// handle change in filter value
	const handleFilterChange = ev => {
		const { value } = ev.target;
		setFilter(value);
	}

	return (
		<div className="singleControl">
			<label className="pagination-label">Enrichment Options:</label>
			<span>Test Correction:</span>
			<select
				className="form-control input-sm"
				name={'correction'}
				onChange={handleCorrectionChange}
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
				onChange={handleMaxpChange}
			/>

			<span>Filter</span>
			<select
				className="form-control input-sm"
				id={'processFilter'}
				name={'processFilter'}
				onChange={handleFilterChange}
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

export default OptionsPanel;
