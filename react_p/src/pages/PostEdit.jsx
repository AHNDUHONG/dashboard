import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.error(err);
                alert("게시글을 불러오는데 실패하였습니다.");
            });
    }, [id]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`${process.env.REACT_APP_API_URL}/posts/${id}`, post)
            .then((res) => {
                alert("게시글이 수정되었습니다.");
                navigate(`/post/${id}`);
            })
            .catch((err) => {
                console.error(err);
                alert("게시글 수정에 실패하였습니다.");
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">게시글 수정</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col">
                    <label
                        htmlFor="title"
                        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        제목
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={post.title}
                        onChange={handleOnChange}
                        name="title"
                        placeholder="제목을 입력하세요."
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="content"
                        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        내용
                    </label>
                    <textarea
                        id="content"
                        value={post.content}
                        onChange={handleOnChange}
                        name="content"
                        placeholder="내용을 입력하세요."
                        rows="6"
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
                    >
                        수정 완료
                    </button>
                    <Link
                        to={`/post/${id}`}
                        className="px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-md text-sm font-medium"
                    >
                        취소
                    </Link>
                </div>
            </form>
        </div>
    );
}
