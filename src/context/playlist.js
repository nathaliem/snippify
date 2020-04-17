import React, { createContext, useState } from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
	const [ selectedPlaylist, setSelectedPlaylist ] = useState({});

	return (
		<PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist }}>
			{children}
		</PlaylistContext.Provider>
	);
};
