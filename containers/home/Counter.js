import {connect} from 'react-redux';
import {increment, decrement, reset} from "../../redux/actions/home";
import Counter from '../../components/home/Counter';

const mapStatesToProps = (state) => ({
	count: state.home.counter.count
});

const mapDispatchToProps = (dispatch) => ({
	increment() {
		dispatch(increment());
	},
	decrement() {
		dispatch(decrement());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(mapStatesToProps, mapDispatchToProps)(Counter);