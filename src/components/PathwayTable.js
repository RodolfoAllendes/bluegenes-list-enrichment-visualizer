import React from 'react';

const PathwayTable = ({ pathways }) => {
	return (
		<div className="im-table relative">
			<div className="table-container">
				<table className="table table-condensed table-bordered table-striped">
					<thead>
						{pathways.length === 0 ? (
							<tr key="no-data">
								<td>No Enriched Pathways Found.</td>
							</tr>
						) : (
							<tr>
								<td>ID</td>
								<td>Description</td>
								<td>P-Value</td>
								<td>Matches</td>
								<td>Size</td>
							</tr>
						)}
					</thead>
					<tbody>
						{pathways.length === 0 ? (
							<tr></tr>
						) : (
							pathways.map(term => {
								return (
									<tr key={term.identifier}>
										<td>{term.identifier}</td>
										<td>{term.description}</td>
										<td>{(term['p-value']).toExponential(4)}</td>
										<td>{term.matches}</td>
										<td>{term.populationAnnotationCount}</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PathwayTable;
