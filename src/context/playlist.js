import React, { createContext, useState } from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
	const [ selectedPlaylist, setSelectedPlaylist ] = useState({});
	const [ currentlyPlayingSong, setCurrentlyPlayingSong ] = useState({});

	return (
		<PlaylistContext.Provider
			value={{ selectedPlaylist, setSelectedPlaylist, currentlyPlayingSong, setCurrentlyPlayingSong }}
		>
			{children}
		</PlaylistContext.Provider>
	);
};
