import React from 'react';

// Definition of the EnrichmentPanel Component
const WidgetList = ({ widgets, selectedWidget, setSelectedWidget }) => {
	return (
		<div className="im-table relative">
			<div className="dashboard">
				<div className="pagination-bar">
					<label className="pagination-label">Select Enrichment Widget:</label>
					<div className="btn-toolbar pagination-buttons">
						<div className="btn-group">
							<select
								className="form-control input-sm"
								onChange={ev => {
									const { value } = ev.target;
									setSelectedWidget(JSON.parse(value));
								}}
							>
								{widgets.map(w => {
									const { title, name } = w;
									return (
										<option
											key={name}
											value={JSON.stringify(w)}
											selected={selectedWidget.name === name}
										>
											{title}
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

export default WidgetList;
