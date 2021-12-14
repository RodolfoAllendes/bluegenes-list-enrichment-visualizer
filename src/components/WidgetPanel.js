import React from 'react';

const WidgetPanel = ({ widgetList, widget, setWidget }) => {

	// handle the change of widget
	const handleChange = ev => {
		const { value } = ev.target;
		setWidget(JSON.parse(value));
	}

	return (
		<div className="singleControl">
			<label className="pagination-label">Select Enrichment Widget:</label>
			<select
				className="form-control input-sm"
				onChange={handleChange}
			>
				{widgetList.map(w => {
					const { title, name } = w;
					return (
						<option
							key={name}
							value={JSON.stringify(w)}
							selected={widget !== undefined && widget.name === name}
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
