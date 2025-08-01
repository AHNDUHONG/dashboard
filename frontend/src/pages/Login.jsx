import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, form, {
                withCredentials: true // 쿠키, 헤더 등 인증 포함 요청
            });
            const token = res.headers['authorization']; // 백엔드에서 Authorization 헤더로 JWT 반환
            localStorage.setItem('token', token);
            navigate('/');
        } catch (err) {
            alert('로그인 실패');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <Typography variant="h5" gutterBottom>로그인</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="아이디"
                    name="username"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    label="비밀번호"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                />
                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                    로그인
                </Button>
            </form>
        </Box>
    );
}