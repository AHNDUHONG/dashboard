// src/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#1976d2',
            },
            ...(mode === 'dark'
                ? {
                    background: {
                        default: '#121212',
                        paper: '#1e1e1e',
                    },
                }
                : {}),
        },
    });
