package restapi.prac.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restapi.prac.model.Comment;
import restapi.prac.service.CommentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 게시글에 속한 댓글 목록 조회
    @GetMapping
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // 댓글 단일 조회
    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> getComment(@PathVariable Long postId,
                                              @PathVariable Long commentId) {
        Optional<Comment> comment = commentService.getComment(commentId);
        return comment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long postId,
                                                 @PathVariable Long commentId,
                                                 @RequestBody Comment updateRequest) {
        Optional<Comment> updated = commentService.updateComment(commentId,
                updateRequest.getContent());
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long postId,
                                              @PathVariable Long commentId) {
        boolean deleted = commentService.deleteComment(commentId);
        return deleted ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}
