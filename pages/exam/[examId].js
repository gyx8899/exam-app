import React, {useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Switch, Radio, Empty, PageHeader, Icon} from "antd";
import Paper from '../../components/exam/Paper';
import {TOGGLE_ANSWER, SET_VISIBILITY_FILTER, visibilityFilters} from "../../redux/constants/exam";
import {isRightType} from "../../constants/ConstTypes";

const {TabPane} = Tabs;

function Exam() {
	const router = useRouter();
	const library = useSelector(state => state.exam.library);
	const showAnswer = useSelector(state => state.exam.config.showAnswer);
	const visibilityFilter = useSelector(state => state.exam.config.visibilityFilter);
	const dispatch = useDispatch();

	const examId = router.query.examId;
	const papers = library[examId].papers;
	const queryIndex = router.query.index * 1;
	if (library[examId] === undefined || papers === undefined || papers.length <= queryIndex) {
		return <Empty/>
	}

	const switchOnChange = useCallback(() => {
		dispatch({type: TOGGLE_ANSWER});
	}, []);
	const radioGroupOnChange = useCallback((e) => {
		dispatch({type: SET_VISIBILITY_FILTER, filter: visibilityFilters[e.target.value]});
	}, []);

	const defaultQueryIndex = (queryIndex >= 0 && queryIndex < library[examId].papers.length) ? queryIndex : 0;
	const [paperData, setPaperData] = useState(papers[queryIndex].data);
	let operations = (
			<div>
				<Radio.Group defaultValue={visibilityFilter} onChange={radioGroupOnChange}>
					<Radio.Button value={visibilityFilters.SHOW_ALL}>{`全部(${paperData.length})`}</Radio.Button>
					<Radio.Button
							value={visibilityFilters.SHOW_WRONG}>{`错题(${paperData.filter(q => q.isRight === isRightType.WRONG).length})`}</Radio.Button>
					<Radio.Button
							value={visibilityFilters.SHOW_UN_DO}>{`未做(${paperData.filter(q => q.isRight === isRightType.INIT).length})`}</Radio.Button>
				</Radio.Group>
			</div>
	);
	const onTabClick = tabIndex => {
		setPaperData(papers[tabIndex].data);
	};
	return (
			<React.Fragment>
				<PageHeader
						onBack={() => window.history.back()}
						title="试题"
						subTitle={`${library[examId].title}`}
						extra={
							<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked={showAnswer} onChange={switchOnChange}/>
						}
				>
				</PageHeader>
				<Tabs defaultActiveKey={defaultQueryIndex.toString()}
							tabBarExtraContent={operations}
							tabPosition="top"
							onTabClick={onTabClick}>
					{
						papers.map((data, i) => (
								<TabPane tab={data.name} key={i}>
									<Paper examId={examId} paperIndex={i}/>
								</TabPane>
						))
					}
				</Tabs>
			</React.Fragment>
	);
}

export default Exam