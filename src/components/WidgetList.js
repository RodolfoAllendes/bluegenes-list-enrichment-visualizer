import React from 'react';

// Definition of the EnrichmentPanel Component
const WidgetList = ({ widgets, selectedWidget, setSelectedWidget }) => {
	return (
		<div className="widget-list-container">
			<h5 className="report-item-heading">Available Widgets</h5>
			<div className="filter-option">
				{widgets.map(w => {
					const { title, name } = w;
					return (
						<label key={name}>
							<div
								className={
									selectedWidget.name === name
										? 'option selected'
										: 'option not-selected'
								}
							>
								<input
									type="checkbox"
									value={JSON.stringify(w)}
									onChange={ev => {
										const { value } = ev.target;
										setSelectedWidget(JSON.parse(value));
									}}
									checked={selectedWidget.name === name}
								/>
								{title}
							</div>
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default WidgetList;
