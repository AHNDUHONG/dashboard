import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreatePost() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const onChangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onClickSubmit = (e) => {
        e.preventDefault(); // 폼 submit 기본 동작 막기

        // 내용이 공백이면 사전 차단
        const trimmedTitle = formData.title.trim();
        const trimmedContent = formData.content.trim();

        if (!trimmedTitle || !trimmedContent) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
            title: trimmedTitle,
            content: trimmedContent,
        })
            .then(res => {
                console.log('게시글 등록 성공:', res.data);
                alert("게시글이 등록되었습니다.");
                navigate("/");
                // 상세 페이지로 이동하고 싶다면 navigate(`/post/${res.data.id}`);
            })
            .catch(err => {
                console.error('게시글 등록 실패:', err);
                alert("게시글 등록에 실패했습니다.");
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">게시글 작성</h1>

            <form onSubmit={onClickSubmit} className="space-y-5">
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        제목
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={onChangeFormData}
                        placeholder="제목을 입력하세요."
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="content" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        내용
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        onChange={onChangeFormData}
                        placeholder="내용을 입력하세요."
                        rows="6"
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
}
