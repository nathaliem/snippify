import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import Playlist from './Playlist';
import axios from 'axios';
import styled from 'styled-components';
import { MoreVert } from '@styled-icons/material';

const Container = styled.div`
	padding: 15px;
	background-color: ${(props) => props.theme.green};
	width: 300px;
	border-right: 5px solid ${(props) => props.theme.lightgrey};
`;

const LoadMoreButton = styled.button`
	border: none;
	background-color: ${(props) => props.theme.black};
	color: #fff;
	border-radius: 25px;
	padding: 15px 45px;
	cursor: pointer;
	font-weight: 500;
	margin-top: 15px;
	font-size: 1rem;
	transition: background-color .3s ease;
	font-family: Montserrat;

	&:hover {
		background-color: #000;
	}
`;

export default React.memo(function Playlists() {
	let { token, setToken } = useContext(AuthContext);
	const [ playlists, setPlaylists ] = useState([]);
	const [ playlistOffset, setPlaylistOffset ] = useState(0);

	const getPlaylists = (offset) => {
		const playlistsToGet = 15;

		axios
			.get(`https://api.spotify.com/v1/me/playlists?limit=${playlistsToGet}&offset=${offset}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				setPlaylists([ ...playlists, ...response.data.items ]);
				setPlaylistOffset(playlistOffset + playlistsToGet);
			})
			.catch((error) => {
				if (error.response) {
					setToken('');
					localStorage.removeItem('token');
				}
			});
	};

	const loadMorePlaylists = () => {
		getPlaylists(playlistOffset);
	};

	useEffect(() => {
		getPlaylists(playlistOffset);
	}, []);

	return (
		<Container>
			<h2>Playlists {/*<MoreVert size="24" title="Options"  />*/}</h2>
			{playlists && playlists.map((playlist) => <Playlist key={playlist.id} playlist={playlist} />)}
			<LoadMoreButton onClick={loadMorePlaylists}>Load more playlists</LoadMoreButton>
		</Container>
	);
});
