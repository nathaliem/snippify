import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { PlaylistContext } from '../context/playlist';
import Login from '../components/Login';
import Playlists from '../components/Playlists';
import Songs from '../components/Songs';
import axios from 'axios';
import styled from 'styled-components';

const Header = styled.header`
	background-color: ${(props) => props.theme.black};
	padding: 10px 15px;

	h1 {
		color: #fff;
		margin: 0;
		padding: 0;
		font-size: 1.4rem;
	}
`;

const Container = styled.div`
	display: flex;
	min-height: 100vh;
`;

export default function Page() {
	const { token } = useContext(AuthContext);
	const [ songs, setSongs ] = useState([]);
	const { selectedPlaylist } = useContext(PlaylistContext);

	const getSongs = (playlist) => {
		axios
			.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				const mappedSongs = response.data.items
					.map((item) => item.track)
					.filter((item) => item.preview_url !== null);
				setSongs(mappedSongs);
			});
	};

	useEffect(
		() => {
			console.log('use effect');
			if (selectedPlaylist.id) {
				getSongs(selectedPlaylist);
			}
		},
		[ selectedPlaylist ]
	);

	console.log('PAGE', selectedPlaylist, songs);

	return (
		<div>
			<Header>
				<h1>Snippify</h1>
			</Header>
			{token ? (
				<Container>
					<Playlists />
					{<Songs songs={songs} />}
				</Container>
			) : (
				<Login />
			)}
		</div>
	);
}
