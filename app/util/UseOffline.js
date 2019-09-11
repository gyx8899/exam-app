import React, {useState, useEffect, useCallback} from 'react';

function useOffline() {
	const [isOffline, setOffline] = useState(!navigator.onLine);
	const [isReOnline, setReOnline] = useState(false);

	const onOffline = useCallback(() => {
		setOffline(true);
		setReOnline(false);
	}, [isOffline]);
	const onOnline = useCallback(() => {
		if (!isOffline) {
			setReOnline(true);
		}
		setOffline(false);
	}, [isOffline, isReOnline]);

	useEffect(() => {
		window.addEventListener('online', onOnline);
		window.addEventListener('offline', onOffline);

		return () => {
			window.removeEventListener('online', onOnline);
			window.removeEventListener('offline', onOffline);
		}
	}, []);

	return [isOffline, isReOnline];
}

export default useOffline;