import React, { useRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayCircleOutline, PauseCircleOutline, Favorite, FavoriteBorder, MoreVert } from '@styled-icons/material';
import { AuthContext } from '../context/auth';
import axios from 'axios';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-items: space-between;
	max-width: 800px;

	& + div {
		margin-top: 10px;
		padding-top: 10px;
		border-top: 1px solid ${(props) => props.theme.lightgrey};
	}
`;

const SongInfo = styled.div`
	flex-grow: 1;
	padding: 0 20px;
	min-width: 50px;

	.song {
		font-weight: 800;
	}

	.artist {
		font-size: 0.8rem;
	}

	p {
		margin: 0;
	}
`;

const SongOptions = styled.div`
	svg {
		cursor: pointer;

		&:hover {
			fill: ${(props) => props.theme.green};
		}
	}
`;

export default function Song(props) {
	let _track = useRef();
	const { token } = useContext(AuthContext);
	const { song, isPlaying, changePlayingSong, getNextSong } = props;
	const [ favorited, setFavorited ] = useState(false);

	useEffect(
		() => {
			console.log(song.name, isPlaying);
			if (_track.current) {
				if (!isPlaying) {
					_track.current.pause();
				} else {
					_track.current.play();
				}
			}
		},
		[ isPlaying ]
	);

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
				if (response.status === 200) setFavorited(true);
			})
			.catch((error) => console.log(error.response));
	};

	return (
		<Container>
			<SongOptions>
				<audio
					onPlay={() => {
						changePlayingSong(song);
						console.log('play');
					}}
					onPause={() => {
						changePlayingSong({});
						console.log('pause');
					}}
					onEnded={() => getNextSong(song)}
					src={song.preview_url}
					ref={_track}
				/>
				{!isPlaying ? (
					<PlayCircleOutline size="32" onClick={() => _track.current.play()} />
				) : (
					<PauseCircleOutline size="32" onClick={() => _track.current.pause()} />
				)}
			</SongOptions>
			<SongInfo>
				<p className="song">{song.name}</p>
				<p className="artist">{song.artists[0].name}</p>
			</SongInfo>
			<SongOptions>
				{!favorited ? <FavoriteBorder size="24" title="Save" onClick={likeSong} /> : <Favorite size="24" />}
				<MoreVert size="24" title="Options" />
			</SongOptions>
		</Container>
	);
}
