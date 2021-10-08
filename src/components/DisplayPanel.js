import React from 'react';

const DisplayPanel = ({ graphType, setGraphType }) => {
	const availableTypes = [
		{ name: 'Bar Graph', type: 'bar' },
		{ name: 'HeatMap Graph', type: 'heatmap' }
	];

	const handleChange = ev => {
		const { value } = ev.target;
		setGraphType(value);
	};

	return (
		<div className="singleControl">
			<label className="pagination-label">Select Display:</label>
			<select className="form-control input-sm" onChange={handleChange}>
				{availableTypes.map(g => {
					return (
						<option key={g.type} value={g.type} selected={graphType === g.name}>
							{g.name}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DisplayPanel;
