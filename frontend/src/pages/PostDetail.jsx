import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentSection from "../components/CommentSection";
import axios from "../api/axiosInstance";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
        authorUsername: "",
        createdAt: "",
        views: 0,
    });

    const getPost = () => {
        console.log("🔍 getPost() 호출됨");
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
                if (err.response?.status === 403) {
                    alert("작성자만 삭제할 수 있습니다.");
                } else {
                    alert("삭제가 실패하였습니다..");
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-6">
            {/* 제목 */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
            {/* 작성자 (제목 아래) */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
                작성자: {post.authorUsername}
            </div>
            {/* 본문 */}
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
            {/* 작성일 · 조회수 (본문 하단 오른쪽 정렬) */}
            <div className="w-full flex justify-end">
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })} · 조회수: {post.views}
                </div>
            </div>
            {/* 수정/삭제 버튼 */}
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
            {/* 댓글 섹션 */}
            <CommentSection postId={id} />
            {/* 뒤로가기 */}
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
