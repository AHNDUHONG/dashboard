import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import axios from "axios";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
    });

    const getPost = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.error("게시글 가져오기 실패:", err);
            });
    };

    useEffect(() => {
        getPost();
    }, []);

    const handleDelete = () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        axios
            .delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(() => {
                alert("삭제가 완료되었습니다.");
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                alert("삭제 중 오류가 발생했습니다.");
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</h1>

            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>

            <div className="flex gap-4 mt-6">
                <Link
                    to={`/post/edit/${id}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    수정하기
                </Link>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                    삭제하기
                </button>
            </div>

            <CommentSection postId={id} />

            <div className="mt-10">
                <Link
                    to="/"
                    className="text-sm text-indigo-500 hover:underline"
                >
                    ← 목록으로 돌아가기
                </Link>
            </div>
        </div>
    );
}
