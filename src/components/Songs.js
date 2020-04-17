import React, { useState } from 'react';
import styled from 'styled-components';
import Song from './Song';

const Container = styled.div`
	flex-grow: 1;
	background-color: #fff;
	padding: 15px;
`;

export default function Songs(props) {
	const { songs } = props;
	const [ currentlyPlayingSong, setCurrentlyPlayingSong ] = useState({});

	const getNextSong = (song) => {
		console.log(typeof songs);
		console.log(typeof songs[0]);
		console.log(Array.from(songs));

		console.log(song, typeof song);
		const currentIndex = songs.findIndex((el) => {
			return el.id === song.id;
		});
		console.log(currentIndex);
		setCurrentlyPlayingSong(songs[currentIndex + 1]);
		//console.log(songs.find(song));
	};

	console.log(songs);

	/*useEffect(() => {

    }, [currentlyPlayingSong]);*/

	return (
		<Container>
			{songs &&
				songs.map((song) => (
					<Song
						key={song.id}
						song={song}
						isPlaying={currentlyPlayingSong.id ? song.id === currentlyPlayingSong.id : false}
						changePlayingSong={() => setCurrentlyPlayingSong(song)}
						getNextSong={() => getNextSong(song)}
					/>
				))}
		</Container>
	);
}
