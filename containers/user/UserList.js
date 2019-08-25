import {connect} from 'react-redux';
import UserList from '../../components/user/UserList';
import {fetchUserListData} from "../../redux/actions/user";

const mapStateToProps = state => ({
	list: state.user.list.list
});

const mapDispatchToProps = dispatch => ({
	fetchUserListData() {
		dispatch(fetchUserListData());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);