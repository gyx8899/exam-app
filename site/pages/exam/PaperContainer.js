import React, { useState, useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Switch, Icon, Menu, Dropdown, Button, message } from 'antd';
import Paper from './Paper';
import {
	TOGGLE_ANSWER,
	SET_VISIBILITY_FILTER,
	visibilityFilters,
	visibilityFiltersText,
} from '../../../site/stores/constants/exam';
import {
	RESET_HEADER,
	SET_SUBTITLE,
	SHOW_BACK_BUTTON,
} from '../../../app/stores/constants/header';

import './PaperContainer.less';

const { TabPane } = Tabs;

function PaperContainer() {
	const router = useRouter();
	const library = useSelector((state) => state.exam.library);
	const user = useSelector((state) => state.exam.user);
	const showAnswer = useSelector((state) => state.exam.config.showAnswer);
	const visibilityFilter = useSelector(
		(state) => state.exam.config.visibilityFilter
	);
	const dispatch = useDispatch();

	const examId = router.query.id;
	const papers = library[examId] && library[examId].papers;
	if (library[examId] === undefined || papers === undefined) {
		Router.back();
	}

	const switchOnChange = useCallback(() => {
		dispatch({ type: TOGGLE_ANSWER });
	}, []);

	const [paperData, setPaperData] = useState(papers[0].data);
	const [exerciseData, setExerciseData] = useState(user[examId][0]);
	const [dropdownText, setDropdownText] = useState(
		visibilityFiltersText[visibilityFilter]
	);

	const handleMenuClick = useCallback((e) => {
		message.info(`已显示-${visibilityFiltersText[e.key]}`);
		dispatch({
			type: SET_VISIBILITY_FILTER,
			filter: visibilityFilters[e.key],
		});
		setDropdownText(visibilityFiltersText[e.key]);
	}, []);

	const dropdownMenus = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key={visibilityFilters.SHOW_ALL}>
				<Icon type="user" />
				{`${visibilityFiltersText.SHOW_ALL}(${paperData.length})`}
			</Menu.Item>
			<Menu.Item key={visibilityFilters.SHOW_WRONG}>
				<Icon type="user" />
				{`${visibilityFiltersText.SHOW_WRONG}(${
					Object.values(exerciseData).filter(
						(q) => q.isRight === false
					).length
				})`}
			</Menu.Item>
			<Menu.Item key={visibilityFilters.SHOW_UN_DO}>
				<Icon type="user" />
				{`${visibilityFiltersText.SHOW_UN_DO}(${
					paperData.length -
					Object.values(exerciseData).filter(
						(q) => q.isRight !== undefined
					).length
				})`}
			</Menu.Item>
		</Menu>
	);
	const operations = (
		<div>
			<Switch
				checkedChildren={<Icon type="check" />}
				unCheckedChildren={<Icon type="close" />}
				defaultChecked={showAnswer}
				onChange={switchOnChange}
			/>
			<Dropdown overlay={dropdownMenus}>
				<Button>
					{dropdownText} <Icon type="down" />
				</Button>
			</Dropdown>
		</div>
	);
	const onTabClick = (tabIndex) => {
		setPaperData(papers[tabIndex].data);
		setExerciseData(user[examId][tabIndex]);
	};

	// Update page header
	useEffect(() => {
		dispatch({ type: SET_SUBTITLE, subTitle: library[examId].title });
		dispatch({ type: SHOW_BACK_BUTTON, showBackButton: true });
		return () => {
			dispatch({ type: RESET_HEADER });
		};
	}, []);

	return (
		<React.Fragment>
			<Tabs
				defaultActiveKey="0"
				tabBarExtraContent={operations}
				tabPosition="top"
				onTabClick={onTabClick}
			>
				{papers.map((data, i) => (
					<TabPane tab={data.name} key={i}>
						<Paper examId={examId} paperIndex={i} />
					</TabPane>
				))}
			</Tabs>
		</React.Fragment>
	);
}

export default PaperContainer;
