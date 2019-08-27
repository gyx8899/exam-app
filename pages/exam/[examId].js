import React, {useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Switch, Empty, Icon, Menu, Dropdown, Button, message} from "antd";
import Paper from '../../components/exam/Paper';
import {TOGGLE_ANSWER, SET_VISIBILITY_FILTER, visibilityFilters, visibilityFiltersText} from "../../redux/constants/exam";
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

	const defaultQueryIndex = (queryIndex >= 0 && queryIndex < library[examId].papers.length) ? queryIndex : 0;
	const [paperData, setPaperData] = useState(papers[queryIndex].data);
	const [dropdownText, setDropdownText] = useState(visibilityFiltersText[visibilityFilter]);

	const handleMenuClick = useCallback((e) => {
		message.info(`已显示-${visibilityFiltersText[e.key]}`);
		dispatch({type: SET_VISIBILITY_FILTER, filter: visibilityFilters[e.key]});
		setDropdownText(visibilityFiltersText[e.key])
	}, []);

	const dropdownMenus = (
			<Menu onClick={handleMenuClick}>
				<Menu.Item key={visibilityFilters.SHOW_ALL}>
					<Icon type="user"/>
					{`${visibilityFiltersText.SHOW_ALL}(${paperData.length})`}
				</Menu.Item>
				<Menu.Item key={visibilityFilters.SHOW_WRONG}>
					<Icon type="user"/>
					{`${visibilityFiltersText.SHOW_WRONG}(${paperData.filter(q => q.isRight === isRightType.WRONG).length})`}
				</Menu.Item>
				<Menu.Item key={visibilityFilters.SHOW_UN_DO}>
					<Icon type="user"/>
					{`${visibilityFiltersText.SHOW_UN_DO}(${paperData.filter(q => q.isRight === isRightType.INIT).length})`}
				</Menu.Item>
			</Menu>
	);
	const operations = (
			<div>
				<Switch checkedChildren={<Icon type="check"/>}
								unCheckedChildren={<Icon type="close"/>}
								defaultChecked={showAnswer}
								onChange={switchOnChange}/>
				<Dropdown overlay={dropdownMenus}>
					<Button>
						{dropdownText} <Icon type="down"/>
					</Button>
				</Dropdown>
			</div>
	);
	const onTabClick = tabIndex => {
		setPaperData(papers[tabIndex].data);
	};
	return (
			<React.Fragment>
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