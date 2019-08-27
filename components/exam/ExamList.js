import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Router from 'next/router'
import {Spin, Tree, message} from 'antd';
import {examConfig as examListConfig, getConfigById} from '../../static/library/index';
import UseDataApi from '../api/UseDataApi';
import {ADD_EXAM} from '../../redux/constants/exam';

const {TreeNode} = Tree;

const ExamList = () => {
	const library = useSelector(state => state.exam.library);
	const dispatch = useDispatch();

	const examLibraryUrl = `/static/library/json/`;
	const [examLists] = useState(examListConfig);
	const [examId, setExamId] = useState(0);
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
			}
			else {
				message.error(`${examId} is not found!`);
			}
		} else if (error) {
			message.error(`${error.message}`);
		}
	}, [dataState]);

	// function(selectedKeys, e:{selected: bool, selectedNodes, node, event})
	const onSelect = useCallback((selectedKeys) => {
		let indexes = selectedKeys.pop().split('.');
		if (indexes.length > 1) {
			let index = indexes.pop(),
					id = indexes.pop();
			Router.push({
				pathname: `/exam/${id}`,
				query: {
					index
				},
			})
		}

	}, [examLists]);

	// function(node)
	const onLoadExamData = useCallback((treeNode) => {
		return new Promise((resolve) => {
			let id = treeNode.props.id;
			let config = getConfigById(examListConfig, id);
			if (config && config.convertJSON && library[id] === undefined) {
				setExamId(id);
				setUrl(`${examLibraryUrl}${id}.json`);

				let resolveInterval = setInterval(() => {
					if (!dataState.isLoading) {
						clearInterval(resolveInterval);
						resolve();
					}
				}, 100);
			} else {
				resolve();
			}
		});
	}, [examLists, library, setExamId, setUrl, dataState]);

	return (
			<Spin spinning={dataState.isLoading}>
				<Tree defaultExpandedKeys={['0-0']} loadData={onLoadExamData} onSelect={onSelect}>
					{examLists.map((itemConfig, i) => (
							<TreeNode title={itemConfig.title} key={i} id={itemConfig.id}>
								{library[itemConfig.id] && library[itemConfig.id].papers.map((paper, j) =>
										<TreeNode title={paper.name} key={`${itemConfig.id}.${j}`} isLeaf/>)
								}
								{
									itemConfig.list && itemConfig.list.length && itemConfig.list.map((listItem, j) => (
											<TreeNode title={listItem.title} key={`${i}-${j}`} id={listItem.id}>
												{library[listItem.id] && library[listItem.id].papers.map((paper, k) =>
														<TreeNode title={paper.name} key={`${listItem.id}.${k}`} isLeaf/>)
												}
											</TreeNode>
									))
								}
							</TreeNode>
					))}
				</Tree>
			</Spin>
	);
};

export default ExamList