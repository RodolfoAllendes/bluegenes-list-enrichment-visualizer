import React from 'react';

// Definition of the Organism Selection Panel
const OrganismPanel = ({ selectedOrganism, setSelectedOrganism }) => {
	// valid organism names in TargetMine
	const organismsValues = [
		'H. sapiens', 
		'M. musculus', 
		'R. norvegicus'
	];
	// handle the change of Organism
	const handleChange = ev => {
		const { value } = ev.target;
		setSelectedOrganism(value);
	};
	
	return (
		<div className="singleControl">
			<label className="pagination-label">Target Organism:</label>
			<select
				className="form-control input-sm"
				onChange={handleChange}
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
