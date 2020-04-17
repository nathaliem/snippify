import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/auth';

const LoginButton = styled.button`
	background-color: ${(props) => props.theme.green};
	color: #fff;
	text-align: center;
	padding: 10px 60px;
	font-weight: 600;
	font-size: 1.5rem;
	font-family: Montserrat;
	border-radius: 25px;
	margin: 40vh auto 0 auto;
	border: 0;
	display: block;
	cursor: pointer;
	transition: background-color .3s ease;

	&:hover {
		background-color: ${(props) => props.theme.black};
	}
`;

export default function Login() {
	const { setToken } = useContext(AuthContext);

	const sendToLoginPage = () => {
		const url = `https://accounts.spotify.com/authorize?client_id=${process.env
			.REACT_APP_SPOTIFY_CLIENTID}&redirect_uri=${process.env
			.REACT_APP_SPOTIFY_REDIRECTURI}&response_type=token&show_dialog=true&scope=user-library-modify user-library-read`;
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
			<LoginButton onClick={sendToLoginPage}>Login with Spotify</LoginButton>
		</div>
	);
}
