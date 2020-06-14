import React from 'react';
import './App.css';
import Page from './screens/Page';
import { AuthProvider } from './context/auth';
import { PlaylistProvider } from './context/playlist';
import { ThemeProvider } from 'styled-components';

const theme = {
	green: '#1DB954',
	black: '#191414',
	grey: '#383A3C',
	lightgrey: '#ecebe8'
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<PlaylistProvider>
					<Page />
				</PlaylistProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
