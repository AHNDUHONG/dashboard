import {AppBar, Box, Button, FormControlLabel, Toolbar} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import {MaterialUISwitch} from "./DarkModeSwitch";


export default function NavBar() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem("darkMode") === "true"
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("darkMode", next);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);


    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Button color="inherit" component={Link} to="/">홈</Button>
                    {token ? (
                        <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">로그인</Button>
                            <Button color="inherit" component={Link} to="/signup">회원가입</Button>
                        </>
                    )}
                </Box>
                <Box display="flex" alignItems="center">
                    <FormControlLabel
                        control={
                            <MaterialUISwitch
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                        }
                        label="" // 라벨 제거
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}