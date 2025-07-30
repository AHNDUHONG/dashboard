package restapi.dash.service;

import org.springframework.stereotype.Service;
import restapi.dash.dto.comment.CommentRequest;
import restapi.dash.dto.comment.CommentResponse;
import restapi.dash.model.Comment;
import restapi.dash.model.Post;
import restapi.dash.repository.CommentRepository;
import restapi.dash.repository.PostRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    // 댓글 작성
    public CommentResponse createComment(Long postId, CommentRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        Comment comment = new Comment();
        comment.setPost(post);  // 관계 설정
        comment.setContent(request.getContent());

        Comment saved = commentRepository.save(comment);
        return toResponse(saved);
    }

    // 댓글 목록 조회
    public List<CommentResponse> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        return post.getComments().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // 댓글 단일 조회
    public Optional<CommentResponse> getComment(Long id) {
        return commentRepository.findById(id)
                .map(this::toResponse);
    }

    // 댓글 수정
    public Optional<CommentResponse> updateComment(Long postId, Long commentId, CommentRequest request) {
        return commentRepository.findByIdAndPostId(commentId, postId)
                .map(c -> {
                    c.setContent(request.getContent());
                    return toResponse(commentRepository.save(c));
        });
    }

    // 댓글 삭제
    public boolean deleteComment(Long postId, Long commentId) {
        return commentRepository.findByIdAndPostId(commentId, postId)
                .map(c -> {
                    commentRepository.delete(c);
                    return true;
                }).orElse(false);
    }

    // 엔티티 → 응답 DTO 변환
    private CommentResponse toResponse(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt()
        );
    }
}
