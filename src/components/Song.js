import React, { useRef } from 'react';

export default function Song(props) {
	let _track = useRef();
	const { song, isPlaying, changePlayingSong, getNextSong } = props;

	if (_track.current) {
		if (!isPlaying) {
			_track.current.pause();
		} else {
			_track.current.play();
		}
	}

	return (
		<div>
			<audio
				onPlay={() => changePlayingSong(song)}
				onPause={() => console.log('pause')}
				onEnded={() => getNextSong(song)}
				controls
				src={song.preview_url}
				ref={_track}
			/>
			<strong>{song.artists[0].name}</strong> - {song.name}
		</div>
	);
}
