import React, { useContext } from 'react';
import { PlaylistContext } from '../context/playlist';
import styled from 'styled-components';

const Item = styled.div`
	padding-bottom: 10px;
	cursor: pointer;
	font-weight: ${(props) => (props.active ? 800 : 500)};
	color: ${(props) => props.theme.black};

	&:hover {
		color: #222326;
	}

	& + & {
		padding-top: 10px;
		border-top: 1px solid ${(props) => props.theme.black};
	}
`;

export default React.memo(function Playlist(props) {
	const { playlist } = props;
	const { selectedPlaylist, setSelectedPlaylist } = useContext(PlaylistContext);

	return (
		<Item active={playlist.id === selectedPlaylist.id} onClick={() => setSelectedPlaylist(playlist)}>
			{playlist.name}
		</Item>
	);
});
