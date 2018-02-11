import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Popup extends Component {

	render() {
		const { orgInit, industry, description, link} = this.props;

		// const outerStyle = {
		// 	position: 'fixed',
 		// 	width: '100%',
 		// 	height: '100%',
 		// 	top: 0,
 		// 	left: 0,
 		// 	right: 0,
 		// 	bottom: 0,
 		// 	margin: 'auto',
		// };
		const outerStyle = {};

		return (
			<div style={outerStyle} className="sans-serif w-100 h-100 bg-black-10">
				<article className="center ba">
				  <h1 className="f4 bg-near-white black-60 mv0 pv2 ph3">{orgInit}</h1>
				  <div className="pa3 bt b--black-10">
				    <p className="f6 f5-ns lh-copy measure">{description}</p>
				  </div>
				</article>
			</div>
		);
	}
}

Popup.propTypes = {
	id: PropTypes.string.isRequired,
	uniqueId: PropTypes.string.isRequired,
	companyName: PropTypes.string,
	orgInit: PropTypes.string,
	projectName: PropTypes.string,
	region: PropTypes.string,
	industry: PropTypes.string,
	targetMarket: PropTypes.string,
	description: PropTypes.string,
	projectStatus: PropTypes.string,
	link: PropTypes.string,
	contactEmail: PropTypes.string,
	onDismissPopup: PropTypes.func,
}

export default Popup;
