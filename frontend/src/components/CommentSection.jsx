import { useState, useEffect } from "react";
import {deleteComment, fetchComments, postComment, updateComment} from "../api/comments";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState("");

    useEffect(() => {
        fetchComments(postId)
            .then(setComments)
            .catch((err) => console.error("댓글 조회에 실패하였습니다.", err));
    }, [postId]);

    const handlePost = () => {
        const trimmed = newComment.trim();
        if (trimmed === "") {
            alert("댓글을 입력해주세요.");
            return;
        }
        postComment(postId, newComment)
            .then((saved) => {
                setComments([...comments, saved]);
                setNewComment("");
            })
            .catch((err) => {
                console.error("댓글 작성에 실패하였습니다.", err);
                alert("댓글 작성에 실패하였습니다.");
            });
    };

    const handleEdit = (id, content) => {
        setEditingId(id);
        setEditingContent(content);
    }

    const handleUpdate = (id) => {
        const trimmed = editingContent.trim();
        if (!trimmed) {
            alert("댓글 내용은 공백일 수 없습니다.");
            return;
        }

        updateComment(postId, id, trimmed)
            .then((updated) => {
                setComments(comments.map(c => (c.id === id ? updated : c)));
                setEditingId(null);
                setEditingContent("");  // 입력란 초기화
            })
            .catch((err) => console.error("댓글 수정에 실패하였습니다."));
    }

    const handleDelete = (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        deleteComment(postId, id)
            .then(() => {
                setComments(comments.filter(c => c.id !== id));
            })
            .catch((err) => console.error("댓글 삭제에 실패하였습니다."));
    };

    return (
        <div className="max-w-3xl w-full mx-auto p-4 space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="border-b dark:border-gray-700 pb-4">
                    {editingId === comment.id ? (
                        <>
                            <textarea
                                className="w-full text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-2 rounded"
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                            />
                            <div className="flex justify-end mt-2 gap-2">
                                <button
                                    onClick={() => handleUpdate(comment.id)}
                                    className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                                >
                                    저장
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-3 py-1 text-sm bg-gray-400 text-white rounded"
                                >
                                    취소
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-black dark:text-white mb-1">{comment.content}</p>
                            <p className="text-xs text-gray-500 mb-1">
                                {new Date(comment.createdAt).toLocaleString()}
                            </p>
                            <div className="flex gap-2 text-xs text-indigo-600">
                                <button onClick={() => handleEdit(comment.id, comment.content)}>
                                    수정
                                </button>
                                <button onClick={() => handleDelete(comment.id)}>
                                    삭제
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}

            {/* 댓글 입력창 */}
            <div className="flex gap-4 items-start pt-4">
                <img src="https://cdn.startupful.io/img/app_logo/no_img.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <textarea
                      className="w-full p-3 text-sm bg-gray-50 dark:bg-[#252731] text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Write a comment..."
                      rows="3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handlePost}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    >
                        Comment
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
