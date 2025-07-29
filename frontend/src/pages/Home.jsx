import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const getPostList = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
                params: {
                    page: currentPage - 1,
                    size: postsPerPage,
                    sort: 'id,DESC'     // 'id' 필드를 기준으로 내림차순 정렬
                },
            })
            .then((res) => {
                setPosts(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                console.error("게시글 가져오기 실패", err);
            });
    };

    useEffect(() => {
        getPostList();
    }, [currentPage]);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">게시글 목록</h1>

            <div className="space-y-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-lg font-semibold text-indigo-600 hover:underline mb-2">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{post.content}</p>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 rounded-md border text-sm font-medium ${
                            number === currentPage
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <div className="flex justify-end mt-10">
                <Link
                    to="/create"
                    className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow"
                >
                    게시글 작성하기
                </Link>
            </div>
        </div>
    );
}
