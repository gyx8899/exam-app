import React, {useState, useEffect, useReducer} from 'react';
import fetch from 'isomorphic-unfetch';

const ACTIONS = {
	FETCH_INIT: 'FETCH_INIT',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_FAILURE: 'FETCH_FAILURE',
	FETCH_CANCELED: 'FETCH_CANCELED'
};

const fetchDataReducer = (state, action) => {
	const {FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCELED} = ACTIONS;
	switch (action.type) {
		case FETCH_INIT:
			return {
				...state,
				isLoading: true,
				data: null,
				error: null
			};
		case FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		case FETCH_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		case FETCH_CANCELED:
			return {
				...state,
				isLoading: false
			};
		default:
			throw new Error();
	}
};

const useFetchData = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);
	const [state, dispatch] = useReducer(fetchDataReducer, {
		isLoading: false,
		isError: false,
		data: initialData
	});

	useEffect(() => {
		let didCancel = false;

		const fetchData = async () => {
			const {FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCELED} = ACTIONS;
			dispatch({type: FETCH_INIT});

			try {
				if (!url) {
					!didCancel && dispatch({type: FETCH_CANCELED});
				} else {
					const result = await fetch(url);
					const data = await result.json();
					!didCancel && dispatch({type: FETCH_SUCCESS, payload: data});
				}
			} catch (error) {
				!didCancel && dispatch({type: FETCH_FAILURE, error});
			}
		};

		fetchData();

		return () => {
			didCancel = true;
		}
	}, [url]);

	return [state, setUrl];
};

export default useFetchData;