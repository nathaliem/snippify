import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/auth';
import axios from 'axios';

export default function Song(props) {
	let _track = useRef();
	const { token } = useContext(AuthContext);
	const { song, isPlaying, changePlayingSong, getNextSong } = props;

	useEffect(() => {
		if (_track.current) {
			if (!isPlaying) {
				_track.current.pause();
			} else {
				_track.current.play();
			}
		}
	}, []);

	const likeSong = () => {
		axios
			.put(
				`https://api.spotify.com/v1/me/tracks?ids=${song.id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error.response));
	};

	return (
		<div>
			<audio
				onPlay={() => changePlayingSong(song)}
				onPause={() => changePlayingSong({})}
				onEnded={() => getNextSong(song)}
				src={song.preview_url}
				ref={_track}
			/>
			{!isPlaying && <button onClick={() => _track.current.play()}>Play</button>}
			{isPlaying && <button onClick={() => _track.current.pause()}>Pause</button>}
			<strong>{song.artists[0].name}</strong> - {song.name}
			<button onClick={likeSong}>Like</button>
		</div>
	);
}
