import React from 'react';

const WidgetList = ({ list, selectedWidget }) => {
	return (
		<div className="widget-list-container">
			<div className="filter-option">
				{list.map(term => {
					const { name } = term;
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
								value={name}
								// onChange={expressionLevelFilter}
								checked={selectedWidget.name == name}
							/>
							<label htmlFor={name}>{name}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WidgetList;
