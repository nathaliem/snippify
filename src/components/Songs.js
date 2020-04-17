import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Song from './Song';
import { PlaylistContext } from '../context/playlist';

const Container = styled.div`
	flex-grow: 1;
	background-color: #fff;
	padding: 15px;
`;

export default function Songs(props) {
	const { songs } = props;
	const [ currentlyPlayingSong, setCurrentlyPlayingSong ] = useState({});
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
			<h2>{selectedPlaylist.name}</h2>
			{songs && selectedPlaylist.name ? (
				songs.map((song) => {
					console.log(song.name, currentlyPlayingSong.id, song.id);
					return (
						<Song
							key={song.id}
							song={song}
							changePlayingSong={(newSong) => setCurrentlyPlayingSong(newSong)}
							getNextSong={() => getNextSong(song)}
							isPlaying={currentlyPlayingSong.id ? song.id === currentlyPlayingSong.id : false}
						/>
					);
				})
			) : (
				<p>Choose a playlist!</p>
			)}
		</Container>
	);
}
