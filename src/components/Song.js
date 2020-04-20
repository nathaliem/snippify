import React, { useRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayCircleOutline, PauseCircleOutline, Favorite, FavoriteBorder, MoreVert } from '@styled-icons/material';
import { AuthContext } from '../context/auth';
import { PlaylistContext } from '../context/playlist';
import axios from 'axios';

const Container = styled.div`
	display:flex; 
	align-items:center; 
	justify-items:space - between; 
	max-width:800px;
	
	& + div {
		margin-top:10px; 
		padding-top:10px; 
		border-top:1px solid $ {(props) => props.theme.lightgrey}; 
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
		cursor:pointer;  
		
		&:hover {
			fill:$ {(props) => props.theme.green}; 
		}
	}
`;

export default React.memo(function Song(props) {
	let _track = useRef();
	const { token } = useContext(AuthContext);
	const { song, getNextSong } = props;
	const { currentlyPlayingSong, setCurrentlyPlayingSong } = useContext(PlaylistContext);
	const [ favorited, setFavorited ] = useState(false);
	let isPlaying = false;

	useEffect(
		() => {
			getPlayStatus();
		},
		[ currentlyPlayingSong ]
	);

	const getPlayStatus = () => {
		isPlaying = song.id === currentlyPlayingSong.id;

		if (_track.current) {
			if (!isPlaying) {
				_track.current.pause();
			} else {
				_track.current.play();
			}
		}
	};

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
			.catch((error) => console.error(error.response));
	};

	return (
		<Container>
			<SongOptions>
				<audio
					onPlay={() => {
						isPlaying = true;
					}}
					onPause={() => {
						isPlaying = false;
					}}
					onEnded={() => getNextSong(song)}
					src={song.preview_url}
					ref={_track}
				/>
				{currentlyPlayingSong.id !== song.id ? (
					<PlayCircleOutline
						size="32"
						onClick={() => {
							setCurrentlyPlayingSong(song);
							_track.current.play();
						}}
					/>
				) : (
					<PauseCircleOutline
						size="32"
						onClick={() => {
							setCurrentlyPlayingSong({});
							_track.current.pause();
						}}
					/>
				)}
			</SongOptions>
			<SongInfo>
				<p className="song"> {song.name} </p> <p className="artist"> {song.artists[0].name} </p>
			</SongInfo>
			<SongOptions>
				{!favorited ? <FavoriteBorder size="24" title="Save" onClick={likeSong} /> : <Favorite size="24" />}
				{/*<MoreVert size="24" title="Options" />*/}
			</SongOptions>
		</Container>
	);
});
