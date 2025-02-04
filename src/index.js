import React from 'react';
import ReactDOM from 'react-dom';
import RootContainer from './RootContainer';

// make sure to export main, with the signature
function main(el, service, imEntity, state, config, navigate) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}
	ReactDOM.render(
		<RootContainer service={service} entity={imEntity} config={config} />,
		el
	);
}

export { main };
