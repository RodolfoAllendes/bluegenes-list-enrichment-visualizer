import React from 'react';

const WidgetList = ({ list, selectedWidget, changeEnrichment }) => {
	return (
		<div className="widget-list-container">
			<div className="filter-option">
				{list.map(term => {
					const { title, name } = term;
					return (
						<label key={name}>
							<div
								className={
									selectedWidget.name == name
										? 'option selected'
										: 'option not-selected'
								}
							>
								<input
									type="checkbox"
									value={JSON.stringify(term)}
									onChange={changeEnrichment}
									checked={selectedWidget.name == name}
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
