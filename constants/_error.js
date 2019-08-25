import React from 'react';
import Error from '../pages/error';

export default class _Error extends React.Component {

	static getInitialProps({res, err}) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		return {statusCode};
	}

	render() {
		return (
				<Error statusCode={this.props.statusCode || 200} />
		);
	}
}