import React from 'react';

const WidgetList = ({ list, selectedWidget, changeEnrichment }) => {
	return (
		<div className="widget-list-container">
			<div className="filter-option">
				{list.map(term => {
					const { title, name } = term;
					return (
						<div
							className={
								selectedWidget.name == name
									? 'option selected'
									: 'option not-selected'
							}
							key={name}
						>
							<input
								type="checkbox"
								id={name}
								value={JSON.stringify(term)}
								onChange={changeEnrichment}
								checked={selectedWidget.name == name}
							/>
							<label htmlFor={name}>{title}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WidgetList;
