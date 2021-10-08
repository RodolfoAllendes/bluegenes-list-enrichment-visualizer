import React from 'react';

const PathwayTable = ({ pathways }) => {
	return (
		<div className="im-table relative">
			<div className="dashboard">
				<div className="pagination-bar">
					<label className="pagination-label">Showing xx of xx rows</label>
					<div className="btn-toolbar pagination-buttons">
						<div className="btn-group">
							<label>Rows per page:</label>
						</div>
						<div className="btn-group">
							<select className="form-control input-sm">
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="50">50</option>
							</select>
						</div>
						<div className="btn-group">
							<button className="btn btn-default">
								<span className="glyphicon glyphicon-triangle-left"></span>
							</button>
							<button className="btn btn-default">
								<span className="glyphicon glyphicon-step-backward"></span>
							</button>
						</div>
						<div className="btn-group">
							<label>Page XX</label>
						</div>
						<div className="btn-group">
							<button className="btn btn-default">
								<span className="glyphicon glyphicon-triangle-right"></span>
							</button>
							<button className="btn btn-default">
								<span className="glyphicon glyphicon-step-forward"></span>
							</button>
						</div>
					</div>
				</div>
			</div>
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
										<td>{term['p-value']}</td>
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
