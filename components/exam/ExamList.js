import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Router from 'next/router'
import {Spin, Tree, message} from 'antd';
import examListConfig from '../../static/library/index';
import UseDataApi from '../api/UseDataApi';
import {ADD_EXAM} from '../../redux/constants/exam';

const {TreeNode} = Tree;

const ExamList = () => {
	const library = useSelector(state => state.exam.library);
	const dispatch = useDispatch();

	const examLibraryUrl = `/static/library/json/`;
	const [examLists] = useState(examListConfig);
	const [examIndex, setExamIndex] = useState(0);
	const [dataState, setUrl] = UseDataApi(``);

	useEffect(() => {
		const {isLoading, data, error} = dataState;
		if (!isLoading && data) {
			let papers = examLists[examIndex].convertJSON(data);
			let newExam = {
				...examLists[examIndex],
				papers
			};
			dispatch({type: ADD_EXAM, newExam: newExam})
		} else if (error) {
			message.error(`${error.message}`);
		}
	}, [dataState]);

	// function(selectedKeys, e:{selected: bool, selectedNodes, node, event})
	const onSelect = useCallback((selectedKeys) => {
		let indexes = selectedKeys.pop().split('-');
		if (indexes.length > 1) {
			Router.push({
				pathname: `/exam/${examLists[indexes[0]].id}`,
				query: {
					// exam: examLists[indexes[0]].id,
					index: indexes[1]},
			})
		}

	}, [examLists]);

	// function(node)
	const onLoadExamData = useCallback((treeNode) => {
		return new Promise((resolve) => {
			let index = treeNode.props.pos.split('-').pop(),
					id = examLists[index].id;
			if (library[id] === undefined) {
				setExamIndex(index);
				setUrl(`${examLibraryUrl}${id}.json`);

				setTimeout(() => {
					resolve();
				}, 1000);
			} else {
				resolve();
			}
		});
	}, [examLists, library, setExamIndex, setUrl]);

	return (
			<Spin spinning={dataState.isLoading}>
				<Tree defaultExpandedKeys={['0-0']} loadData={onLoadExamData} onSelect={onSelect}>
					{examLists.map((examConfig, i) => (
							<TreeNode title={examConfig.title} key={i}>
								{library[examConfig.id] && library[examConfig.id].papers.map((paper, j) =>
										<TreeNode title={paper.name} key={`${i}-${j}`} isLeaf/>)
								}
							</TreeNode>
					))}
				</Tree>
			</Spin>
	);
};

export default ExamList