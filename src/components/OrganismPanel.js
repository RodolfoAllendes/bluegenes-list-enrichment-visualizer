import React from 'react';

// Definition of the Organism Selection Panel
const OrganismPanel = ({ selectedOrganism, setSelectedOrganism }) => {
	const organismsValues = ['H. sapiens', 'M. musculus', 'R. norvegicus'];
	return (
		<div className="singleControl">
			<label className="pagination-label">Target Organism:</label>
			<select
				className="form-control input-sm"
				onChange={ev => {
					const { value } = ev.target;
					setSelectedOrganism(value);
				}}
			>
				{organismsValues.map(o => (
					<option key={o} value={o} selected={selectedOrganism.name === o}>
						{o}
					</option>
				))}
			</select>
		</div>
	);
};

export default OrganismPanel;
