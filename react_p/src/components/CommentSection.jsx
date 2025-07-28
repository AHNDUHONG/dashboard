import { useState, useEffect } from "react";
import { fetchComments, postComment} from "../api/comments";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchComments(postId)
            .then(setComments)
            .catch((err) => console.error("댓글 작성에 실패하였습니다.", err));
    }, [postId]);

    const handlePost = () => {
        if (newComment.trim() === "") return;
        postComment(postId, newComment)
            .then((saved) => {
                setComments([...comments, saved]);
                setNewComment("");
            })
            .catch((err) => console.error("Failed to post comment", err));
    };

    return (
        <div className="max-w-3xl w-full mx-auto p-4 space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="border-b dark:border-gray-700 pb-4">
                    <p className="text-sm text-black dark:text-white mb-1">{comment.content}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                    </p>
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
