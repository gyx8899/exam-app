import UserList from '../../containers/user/UserList';
import {fetchUserListData} from "../../redux/actions/user";

UserList.getInitialProps = async (props) => {
	const {store} = props.ctx;
	store.dispatch(fetchUserListData());
	return {};
};

export default UserList;