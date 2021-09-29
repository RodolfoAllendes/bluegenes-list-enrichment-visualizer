import React from 'react';

const PathwayTable = ({ pathways }) => {
	return (
		<div className="report-item">
			<h4 className="report-item-heading">Enriched Pathways</h4>
			<div className="im-table relative">
				<div className="table-container">
					<table className="table table-condensed table-bordered table-striped">
						<thead></thead>
						<tbody>
							{pathways.map(term => {
								return (
									<tr key={term.identifier}>
										<td>{term.identifier}</td>
										<td>{term.description}</td>
										<td>{term['p-value']}</td>
										<td>{term.matches}</td>
										<td>{term.populationAnnotationCount}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PathwayTable;
