import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';

export default function Login() {
	const { setToken } = useContext(AuthContext);

	const sendToLoginPage = () => {
		const url = `https://accounts.spotify.com/authorize?client_id=${process.env
			.REACT_APP_SPOTIFY_CLIENTID}&redirect_uri=${process.env
			.REACT_APP_SPOTIFY_REDIRECTURI}&response_type=token&show_dialog=true&'&scope=user-library-modify user-library-read`;
		window.location = url;
	};

	const getHash = () => {
		const hash = window.location.hash.substring(1).split('&').reduce(function(initial, item) {
			if (item) {
				const parts = item.split('=');
				initial[parts[0]] = decodeURIComponent(parts[1]);
			}
			return initial;
		}, {});

		if (hash['access_token']) {
			const token = hash['access_token'];
			localStorage.setItem('token', token);
			setToken(token);
			window.location.hash = '';
		}
	};

	useEffect(() => {
		getHash();
	});

	return (
		<div>
			<button onClick={sendToLoginPage}>Login with Spotify</button>
		</div>
	);
}
