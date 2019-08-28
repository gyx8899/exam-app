import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Router from 'next/router'
import {Spin, Tree, message} from 'antd';
import {examConfig as examListConfig, getConfigById, libraryJSONPath} from '../../static/library/index';
import UseDataApi from '../api/UseDataApi';
import {ADD_EXAM} from '../../redux/constants/exam';

const {TreeNode} = Tree;

const ExamList = () => {
	const library = useSelector(state => state.exam.library);
	const dispatch = useDispatch();

	const [examLists] = useState(examListConfig);
	const [examId, setExamId] = useState(0);
	const [dataState, setUrl] = UseDataApi(``);

	const getExpandedKeys = useCallback(() => {
		let _expendedKeys = [];
		for (let i = 0, li = examLists.length; i < li; i++) {
			let _config = examLists[i];
			if (_config.convertJSON) {
				let _libraryItem = library[_config.id];
				if (_libraryItem && _libraryItem.papers && _libraryItem.papers.length) {
					_expendedKeys.push(`0-${i}`);
				}
			} else if (_config.list && _config.list.length) {
				_expendedKeys.push(`0-${i}`);
				for (let j = 0, lj = _config.list.length; j < lj; j++) {
					let __config = _config.list[j];
					if (__config.convertJSON) {
						let _libraryItem = library[__config.id];
						if (_libraryItem && _libraryItem.papers && _libraryItem.papers.length) {
							_expendedKeys.push(`0-${i}-${j}`);
						}
					}
				}
			}
		}
		return _expendedKeys;
	}, [library, examLists]);
	const [expandedKeys] = useState(getExpandedKeys());

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
				setUrl(`${libraryJSONPath}${id}.json`);

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
				<Tree defaultExpandedKeys={expandedKeys} loadData={onLoadExamData} onSelect={onSelect}>
					{examLists.map((itemConfig, i) => (
							<TreeNode title={itemConfig.title} key={`0-${i}`} id={itemConfig.id}>
								{library[itemConfig.id] && library[itemConfig.id].papers.map((paper, j) =>
										<TreeNode title={paper.name} key={`${itemConfig.id}.${j}`} isLeaf/>)
								}
								{
									itemConfig.list && itemConfig.list.length && itemConfig.list.map((listItem, j) => (
											<TreeNode title={listItem.title} key={`0-${i}-${j}`} id={listItem.id}>
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