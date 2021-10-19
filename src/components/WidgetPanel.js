import React from 'react';

// Definition of the EnrichmentPanel Component
const WidgetPanel = ({ widgetList, widget, setWidget }) => {
	return (
		<div className="singleControl">
			<label className="pagination-label">Select Enrichment Widget:</label>
			<select
				className="form-control input-sm"
				onChange={ev => {
					const { value } = ev.target;
					setWidget(JSON.parse(value));
				}}
			>
				{widgetList.map(w => {
					const { title, name } = w;
					return (
						<option
							key={name}
							value={JSON.stringify(w)}
							selected={widget.name === name}
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
