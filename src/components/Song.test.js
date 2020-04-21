import React from 'react';
import { AuthContext } from '../context/auth';
import Song from './Song';
import { render, fireEvent, wait } from '@testing-library/react';
import renderer, { create } from 'react-test-renderer';
import axios from 'axios';
import { PlaylistProvider } from '../context/playlist';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

window.HTMLMediaElement.prototype.load = () => {
	/* do nothing */
};
window.HTMLMediaElement.prototype.play = () => {
	/* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
	/* do nothing */
};
window.HTMLMediaElement.prototype.addTextTrack = () => {
	/* do nothing */
};

describe('Song', () => {
	const setUpComponent = () => {
		const song = {
			preview_url: '',
			name: 'Song name',
			artists: [
				{
					name: 'Artist name'
				}
			]
		};

		return render(
			<AuthContext.Provider value={{ token: 'test' }}>
				<PlaylistProvider>
					<Song song={song} />
				</PlaylistProvider>
			</AuthContext.Provider>
		);
	};

	it('favorites the Song', async () => {
		let Song, favorite;

		Song = setUpComponent();

		await wait(() => {
			favorite = Song.getByTestId('favorite');
		});

		axios.put.mockResolvedValue({
			status: 200
		});

		fireEvent.click(favorite);

		await wait(() => {
			expect(Song.queryByTestId('favorite')).toBeNull();
		});
	});
});
