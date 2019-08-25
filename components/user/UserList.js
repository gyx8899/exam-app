import React, {Component} from 'react';
import {RoleType} from '../../constants/ConstTypes';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {Table} from "antd";

class UserList extends Component {
	static propTypes = {
		fetchUserListData: PropTypes.func.isRequired,
		list: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);

		const {list} = props;

		this.state = {
			dataSource: list
		};

		this.columns = [
			{
				title: 'Username',
				dataIndex: 'username',
				key: 'username',
				render: (text)=>(
						<Link href={`/user/userDetail?username=${text}`} as={`/user/userDetail/${text}`}>
							<a>{text}</a>
						</Link>
				)
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: 'Role',
				dataIndex: 'role',
				key: 'role',
				render: (text) => (<span>{RoleType[text]}</span>)
			}
		]
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.list && nextProps.list !== prevState.dataSource) {
			return {
				list: nextProps.list
			};
		}
		return null;
	}

	render() {
		const {dataSource} = this.state;
		dataSource.map((item) => {
			item.key = item.id;
			item.role = 10;
		});
		return (
				<Table
					style={{minWidth: '320px'}}
					dataSource={dataSource}
				/>
		);
	}

}

export default UserList;