import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Song from './Song';
import { PlaylistContext } from '../context/playlist';

const Container = styled.div`
	flex-grow: 1;
	background-color: #fff;
	padding: 15px;
`;

const SongCount = styled.span`
	font-size: 0.9rem;
	color: ${(props) => props.theme.grey};
`;

export default React.memo(function Songs(props) {
	const { songs } = props;
	const { setCurrentlyPlayingSong } = useContext(PlaylistContext);
	const { selectedPlaylist } = useContext(PlaylistContext);

	const getNextSong = (song) => {
		const currentIndex = songs.findIndex((el) => {
			return el.id === song.id;
		});

		if (currentIndex !== songs.length - 1) {
			setCurrentlyPlayingSong(songs[currentIndex + 1]);
		}
	};

	useEffect(
		() => {
			setCurrentlyPlayingSong({});
		},
		[ selectedPlaylist ]
	);

	return (
		<Container>
			<h2>
				{selectedPlaylist.name}{' '}
				{selectedPlaylist.tracks && <SongCount>({selectedPlaylist.tracks.total})</SongCount>}
			</h2>
			{songs && selectedPlaylist.name ? (
				songs.map((song) => {
					return <Song key={song.id} song={song} getNextSong={() => getNextSong(song)} />;
				})
			) : (
				<p>Choose a playlist!</p>
			)}
		</Container>
	);
});
