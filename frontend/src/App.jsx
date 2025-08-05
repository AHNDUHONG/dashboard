import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import {useEffect, useMemo, useState} from "react";
import {getTheme} from "./theme";
import {Button, CssBaseline, ThemeProvider} from "@mui/material";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";

export default function App() {

    const [mode, setMode] = useState('light');

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                    <NavBar />
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                        <div className="max-w-4xl mx-auto px-4 py-8">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/create" element={<CreatePost />} />
                                <Route path="/post/:id" element={<PostDetail />} />
                                <Route path="/post/edit/:id" element={<PostEdit />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </div>
                    </div>
            </Router>
        </ThemeProvider>
    );
}
