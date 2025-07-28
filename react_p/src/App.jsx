import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreatePost />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/post/edit/:id" element={<PostEdit />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
