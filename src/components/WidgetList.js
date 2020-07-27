import React from 'react';

const WidgetList = ({ list, selectedWidget, changeEnrichment }) => {
	return (
		<div className="widget-list-container">
			<div className="filter-option">
				{list.map(term => {
					const { title } = term;
					return (
						<div
							className={
								selectedWidget.title == title
									? 'option selected'
									: 'option not-selected'
							}
							key={title}
						>
							<input
								type="checkbox"
								id={term.title}
								value={JSON.stringify(term)}
								onChange={changeEnrichment}
								checked={selectedWidget.title == title}
							/>
							<label htmlFor={title}>{title}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WidgetList;
