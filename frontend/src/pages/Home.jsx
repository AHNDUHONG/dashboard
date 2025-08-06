import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [searchKeyword, setSearchKeyword] = useState("");

    const getPostList = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
                params: {
                    page: currentPage - 1,
                    size: postsPerPage,
                    keyword: searchKeyword,
                    sort: 'id,DESC'     // 'id' 필드를 기준으로 내림차순 정렬
                },
                headers: {
                    Authorization:`Bearer ${token}` ,
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
    }, [currentPage, searchKeyword]);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        getPostList();
    };


    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">게시글 목록</h1>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg shdaw-sm dark:bg-gray-700 dark:text-white"
                />
                <button
                    onClick={handleSearch}    // 검색 시 페이지를 1로
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    검색
                </button>
                <button
                    onClick={() => {
                        setSearchKeyword("");
                        setCurrentPage(1);
                    }}
                    className="ml-2 px-3 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
                >
                    초기화
                </button>
            </div>

            <div className="space-y-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-lg font-semibold text-indigo-600 hover:underline mb-2">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>

                        {/* 게시글 본문 (간략히 보여줌) */}
                        <p className="text-sm text-gray-700 dark:text-gray-300">{post.content}</p>

                        {/* 추가 정보: 작성자, 날짜, 조회수 */}
                        <div className=" text-xs text-right text-gray-500 dark:text-gray-400 mt-2">
                            작성자: {post.authorUsername} ·{" "}
                            {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })} · 조회수: {post.views}
                        </div>
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
