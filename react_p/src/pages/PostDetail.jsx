import CommentSection from "../components/CommentSection";

export default function PostDetail() {
    const postId = 1; // 예시

    return (
        <div className="p-6">
            {/* 게시글 내용 */}
            <h1 className="text-xl font-bold mb-4">Post Title</h1>
            <p className="mb-8">Post content...</p>

            {/* 댓글 섹션 */}
            <CommentSection postId={postId} />
        </div>
    );
}
