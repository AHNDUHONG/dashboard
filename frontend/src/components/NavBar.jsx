import {AppBar, Button, Toolbar} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';


export default function NavBar() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">홈</Button>
                {token ? (
                    <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">로그인</Button>
                        <Button color="inherit" component={Link} to="/signup">회원가입</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}