import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';
import LibraryMusicSharpIcon from '@mui/icons-material/LibraryMusicSharp';
import LyricsSharpIcon from '@mui/icons-material/LyricsSharp';
import PlaylistAddCircleSharpIcon from '@mui/icons-material/PlaylistAddCircleSharp';
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';

const links = [
    { text: 'Add Song', path: '.', icon: <LibraryMusicSharpIcon /> },
    { text: 'List Song', path: 'list-song', icon: <LyricsSharpIcon /> },
    { text: 'Add Album', path: 'add-album', icon: <PlaylistAddCircleSharpIcon /> },
    { text: 'List Album', path: 'list-album', icon: <LibraryBooksSharpIcon /> },
    { text: 'Stats', path: 'stats', icon: <IoBarChartSharp /> },
    { text: 'Profile', path: 'profile', icon: <ImProfile /> },
];

export default links;