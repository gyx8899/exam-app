import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Router from 'next/router'
import {Spin, Tree, message} from 'antd';
import {examConfig as examListConfig, getConfigById, libraryJSONPath} from '../../static/library/index';
import UseDataApi from '../api/UseDataApi';
import {ADD_EXAM} from '../../redux/constants/exam';

const {TreeNode, DirectoryTree} = Tree;

const ExamList = () => {
	const library = useSelector(state => state.exam.library);
	const dispatch = useDispatch();

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
	const onSelect = useCallback(([id]) => {
		let config = getConfigById(examListConfig, id);
		if (config && config.convertJSON && library[id] === undefined) {
			setExamId(id);
			setUrl(`${libraryJSONPath}${id}.json`);

			let resolveInterval = setInterval(() => {
				if (!dataState.isLoading) {
					clearInterval(resolveInterval);
					Router.push({pathname: `/exam/${id}`});
				}
			}, 100);
		} else {
			Router.push({pathname: `/exam/${id}`});
		}
	}, [examLists]);

	return (
			<Spin spinning={dataState.isLoading}>
				<DirectoryTree multiple defaultExpandAll onSelect={onSelect}>
					{examLists.map(itemConfig => (
							<TreeNode title={itemConfig.title} key={itemConfig.id} isLeaf={!itemConfig.list}>
								{
									itemConfig.list && itemConfig.list.length && itemConfig.list.map(listItem => (
											<TreeNode title={listItem.title} key={listItem.id} isLeaf={!listItem.list} />
									))
								}
							</TreeNode>
					))}
				</DirectoryTree>
			</Spin>
	);
};

export default ExamList