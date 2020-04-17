import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import { PlaylistContext } from '../context/playlist';
import Playlist from './Playlist';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	padding: 15px;
	background-color: ${(props) => props.theme.green};
	max-width: 300px;
	flex-grow: 1;
`;

export default function Playlists(props) {
	let { token, setToken } = useContext(AuthContext);
	const { selectedPlaylist } = useContext(PlaylistContext);
	const [ playlists, setPlaylists ] = useState([]);
	const [ playlistOffset, setPlaylistOffset ] = useState(0);

	const getPlaylists = (offset) => {
		const playlistsToGet = 5;

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
			{playlists && playlists.map((playlist) => <Playlist key={playlist.id} playlist={playlist} />)}
			<button onClick={loadMorePlaylists}>Load more playlists</button>
		</Container>
	);
}
