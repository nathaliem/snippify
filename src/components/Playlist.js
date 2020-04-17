import React, { useContext } from 'react';
import { PlaylistContext } from '../context/playlist';
import styled from 'styled-components';

const Item = styled.div`
	margin-bottom: 10px;
	cursor: pointer;

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
	const { setSelectedPlaylist } = useContext(PlaylistContext);

	return (
		<Item onClick={() => setSelectedPlaylist(playlist)}>
			{playlist.name} <span className="playlistNumber">({playlist.tracks.total})</span>
		</Item>
	);
}
