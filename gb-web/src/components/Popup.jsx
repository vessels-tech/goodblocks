import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Popup extends Component {


	formatOrPlaceholder = (field) => {
		if (field === null) {
			return '-';
		}

		if (field.length === 0 ) {
			return '-';
		}

		return field;
	}

	getLinkField() {
		const { link } = this.props;

		if (this.formatOrPlaceholder(link) === '-') {
			return '-'
		}

		const maybeValidLink = link
			.replace("https://", '')
			.replace("http://", '');

		console.log(maybeValidLink);

		return (
			<a target="blank" href={`https://${maybeValidLink}`}>{link}</a>
		);
	}

	render() {
		const {
			uniqueId,
			companyName,
			orgInit,
			projectName,
			region,
			industry,
			targetMarket,
			description,
			projectStatus,
			link,
			contactEmail,
			tech,
		} = this.props;

		const primarySectorFormatted = this.formatOrPlaceholder(industry);
		const techFormatted = this.formatOrPlaceholder(tech);
		const statusFormatted = this.formatOrPlaceholder(projectStatus);
		const emailFormatted = this.formatOrPlaceholder(contactEmail);

		return (
			<div className="sans-serif w-100 h-100">
				  <h1 className="fw3 f4 black-60 mv0 pv2 ph3">{orgInit}</h1>
					<div className="fl w-100 w-50-ns ph4 pv4-ns pa1 b">
						<p className="fw6 f6 f5-ns lh-copy measure">{description}</p>
					</div>
					<div className="fl w-100 w-50-ns ph4 pv4-ns pa1 ">
						<p><b>Primary Sector:</b> {primarySectorFormatted}</p>
						<p><b>Tech:</b> {techFormatted}</p>
						<p><b>Status:</b> {statusFormatted}</p>
						<p><b>Links:</b> {this.getLinkField()}</p>
						<p><b>Email:</b> {emailFormatted}</p>
					</div>
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
	tech: PropTypes.string,
	onDismissPopup: PropTypes.func,
}

export default Popup;
