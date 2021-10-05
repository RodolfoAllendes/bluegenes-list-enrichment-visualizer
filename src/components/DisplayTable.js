import React from 'react';

const DisplayTable = ({ graphType, setGraphType }) => {
	const availableTypes = [
		{ name: 'Bar Graph', type: 'bar' },
		{ name: 'HeatMap Graph', type: 'heatmap' }
	];

	return (
		<div className="im-table relative">
			<div className="dashboard">
				<div className="pagination-bar">
					<label className="pagination-label">Select Display:</label>
					<div className="btn-toolbar pagination-buttons">
						<div className="btn-group">
							<select
								className="form-control input-sm"
								onChange={ev => {
									const { value } = ev.target;
									setGraphType(value);
								}}
							>
								{availableTypes.map(g => {
									return (
										<option
											key={g.type}
											value={g.type}
											selected={graphType === g.name}
										>
											{g.name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisplayTable;
