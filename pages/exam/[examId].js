import React, {useState, useCallback, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import {Tabs, Switch, Empty, Icon, Menu, Dropdown, Button, message, Spin} from "antd";
import Paper from '../../components/exam/Paper';
import {
	TOGGLE_ANSWER,
	SET_VISIBILITY_FILTER,
	visibilityFilters,
	visibilityFiltersText,
	ADD_EXAM
} from "../../redux/constants/exam";
import {isRightType} from "../../constants/ConstTypes";
import UseDataApi from "../../components/api/UseDataApi";
import {examConfig as examListConfig, getConfigById, libraryJSONPath} from "../../static/library";

const {TabPane} = Tabs;

function Exam() {
	const router = useRouter();
	const library = useSelector(state => state.exam.library);
	const showAnswer = useSelector(state => state.exam.config.showAnswer);
	const visibilityFilter = useSelector(state => state.exam.config.visibilityFilter);
	const dispatch = useDispatch();

	const [dataState, setUrl] = UseDataApi(``);
	useEffect(() => {
		const {isLoading, data, error} = dataState;
		if (!isLoading && data) {
			let config = getConfigById(examListConfig, examId);
			if (config && config.convertJSON) {
				let papers = config.convertJSON(data);
				let newExam = {
					...config,
					papers
				};
				dispatch({type: ADD_EXAM, newExam: newExam})
			} else {
				message.error(`${examId} is not found!`);
			}
		} else if (error) {
			message.error(`${error.message}`);
		}
	}, [dataState]);

	const examId = router.query.examId;
	const papers = library[examId] && library[examId].papers;
	if (library[examId] === undefined || papers === undefined) {
		setUrl(`${libraryJSONPath}${id}.json`);
	}

	const switchOnChange = useCallback(() => {
		dispatch({type: TOGGLE_ANSWER});
	}, []);

	const [paperData, setPaperData] = useState(papers[0].data);
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
			<Spin spinning={dataState.isLoading}>
				<Tabs defaultActiveKey="0"
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
			</Spin>
	);
}

export default Exam