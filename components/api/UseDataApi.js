import React, {Fragment, useState, useEffect, useReducer} from 'react';
import fetch from 'isomorphic-unfetch';

const ACTIONS = {
	FETCH_INIT: 'FETCH_INIT',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_FAILURE: 'FETCH_FAILURE',
	FETCH_CANCELED: 'FETCH_CANCELED'
};

const dataFetchReducer = (state, action) => {
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

const useDataApi = (initialUrl, initialData) => {
	const [url, setUrl] = useState(initialUrl);
	const [state, dispatch] = useReducer(dataFetchReducer, {
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

function App() {
	const searchUrl = `https://hn.algolia.com/api/v1/search?query=`;
	const [query, setQuery] = useState('redux');
	const [state, setUrl] = useDataApi(`${searchUrl}redux`,
			{hits: []},);
	const {isError, isLoading, data} = state;

	return (
			<Fragment>
				<form onSubmit={(event) => {
					setUrl(`${searchUrl}${query}`);
					event.preventDefault();
				}}>
					<input type="text"
								 value={query}
								 onChange={event => setQuery(event.target.value)}
					/>
					<button type="submit">Search</button>
				</form>
				{isError && <div>Something went wrong...</div>}
				{isLoading ? (
								<div>Loading ...</div>
						)
						: (
								<ul>
									{data.hits.map(item => (
											<li key={item.objectID}>
												<a href={item.url}>{item.title}</a>
											</li>
									))}
								</ul>
						)}
			</Fragment>
	);
}

export default useDataApi;