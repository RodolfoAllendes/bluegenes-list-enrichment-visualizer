import React from 'react';

// Definition of the EnrichmentPanel Component
const WidgetPanel = ({ widgets, selectedWidget, setSelectedWidget }) => {
	return (
		<div className="singleControl">
			<label className="pagination-label">Select Enrichment Widget:</label>
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
	);
};

export default WidgetPanel;
