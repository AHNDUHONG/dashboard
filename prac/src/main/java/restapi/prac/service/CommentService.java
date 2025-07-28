package restapi.prac.service;

import org.springframework.stereotype.Service;
import restapi.prac.model.Comment;
import restapi.prac.model.Post;
import restapi.prac.repository.CommentRepository;
import restapi.prac.repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    // 특정 게시글의 댓글 목록
    public List<Comment> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        return post.getComments();
    }

    // 댓글 작성
    public Comment createComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));
        comment.setPost(post);
        post.getComments().add(comment);    // 관계 매핑을 위해 저장 전 리스트에 추가
        return commentRepository.save(comment);
    }

    // 댓글 단일 조회
    public Optional<Comment> getComment(Long id) {
        return commentRepository.findById(id);
    }

    // 댓글 수정
    public Optional<Comment> updateComment(Long id, String content) {
        return commentRepository.findById(id).map(c -> {
            c.setContent(content);
            return commentRepository.save(c);
        });
    }

    // 댓글 삭제
    public boolean deleteComment(Long id) {
        return commentRepository.findById(id).map(c -> {
            commentRepository.delete(c);
            return true;
        }).orElse(false);
    }
}
