import { useState } from "react";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([
        // 예시 댓글
        {
            id: 1,
            user: "Alex Kim",
            content: "Really insightful article! The points about modern development practices are spot-on.",
            time: "5m ago",
            replies: [
                {
                    id: 11,
                    user: "Emma Chen",
                    content: "@Alex Kim Thanks for the feedback! What specific practices resonated with you the most?",
                    time: "3m ago"
                }
            ]
        }
    ]);
    const [newComment, setNewComment] = useState("");

    const handlePost = () => {
        if (newComment.trim() === "") return;
        // 서버에 POST 요청할 수도 있고, 임시로 state만 갱신
        const newObj = {
            id: Date.now(),
            user: "You",
            content: newComment,
            time: "just now",
            replies: []
        };
        setComments([...comments, newObj]);
        setNewComment("");
    };

    return (
        <div className="max-w-3xl w-full mx-auto p-4 space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="border-b dark:border-gray-700 pb-6">
                    <div className="flex gap-4">
                        <img src="https://cdn.startupful.io/img/app_logo/no_img.png" className="w-8 h-8 rounded-full mt-1" alt="avatar" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-black dark:text-white">{comment.user}</span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{comment.time}</span>
                            </div>
                            <p className="text-sm text-black dark:text-white mb-3">{comment.content}</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <button className="hover:text-indigo-500">Reply</button>
                                <button className="hover:text-indigo-500">Share</button>
                                <button className="hover:text-indigo-500">Report</button>
                            </div>

                            {/* 대댓글 */}
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="mt-6 ml-6 flex gap-4 border-b dark:border-gray-700 pb-6">
                                    <div className="relative">
                                        <div className="absolute -left-6 top-4 h-full w-px bg-gray-200 dark:bg-gray-700" />
                                        <img src="https://cdn.startupful.io/img/app_logo/no_img.png" className="w-8 h-8 rounded-full mt-1" alt="avatar" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-black dark:text-white">{reply.user}</span>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-gray-500">{reply.time}</span>
                                        </div>
                                        <p className="text-sm text-black dark:text-white mb-3">
                                            <span className="text-indigo-500">@{comment.user}</span> {reply.content}
                                        </p>
                                        <div className="flex gap-4 text-xs text-gray-500">
                                            <button className="hover:text-indigo-500">Reply</button>
                                            <button className="hover:text-indigo-500">Share</button>
                                            <button className="hover:text-indigo-500">Report</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
