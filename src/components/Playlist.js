import React, { useContext } from 'react';
import { PlaylistContext } from '../context/playlist';
import styled from 'styled-components';

const Item = styled.div`
	margin-bottom: 10px;
	cursor: pointer;
	font-weight: ${(props) => (props.active ? 500 : 400)};

	&:hover {
		font-weight: 500;
	}

	.playlistNumber {
		font-size: 0.8rem;
		visibility: hidden;
	}
`;

export default function Playlist(props) {
	const { playlist } = props;
	const { selectedPlaylist, setSelectedPlaylist } = useContext(PlaylistContext);

	console.log('Playlist');

	return (
		<Item active={playlist.id === selectedPlaylist.id} onClick={() => setSelectedPlaylist(playlist)}>
			{playlist.name} <span className="playlistNumber">({playlist.tracks.total})</span>
		</Item>
	);
}
