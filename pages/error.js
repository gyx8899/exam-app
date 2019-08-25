import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button} from "antd/lib/index";
import Router from 'next/router';

class Error extends Component {
	static propTypes = {
		statusCode: PropTypes.number
	};

	static defaultProps = {
		statusCode: 200
	};


	render() {
		let image = null,
				title = '';
		switch (this.props.statusCode) {
			case 200:
			case 404: {
				image = '/static/images/empty-440x440.png';
				title = `The page is not found | 404 \`~_~\``;
				break;
			}
			case 500: {
				image = '/static/images/error-100x100.png';
				title = 'The page is error | 500 \`~_~\`';
				break;
			}
			default:
				break;
		}

		return (
				<Fragment>
					<style jsx>{`
						.error-image {
							width: 100px;
							height: 100px;
							margin: 10px 0;
						}
					`}</style>
					<img className="error-image" alt="error image" src={image}/>
					<h3>{title}</h3>
					<Button onClick={() => Router.push('/')} type='primary'>Back Home</Button>
				</Fragment>
		);
	}
}

export default Error;