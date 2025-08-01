package restapi.dash.controller;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restapi.dash.dto.comment.CommentRequest;
import restapi.dash.dto.comment.CommentResponse;
import restapi.dash.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 댓글 작성
    @PostMapping
    public ResponseEntity<CommentResponse> createComment(@PathVariable Long postId,
                                                         @RequestBody @Valid CommentRequest request) {
        CommentResponse created = commentService.createComment(postId, request);
        return ResponseEntity.ok(created);
    }

    // 게시글에 속한 댓글 목록 조회
    @GetMapping
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long postId) {
        List<CommentResponse> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // 댓글 단일 조회
    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponse> getComment(@PathVariable Long postId,
                                              @PathVariable Long commentId) {
        return commentService.getComment(commentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable Long postId,
                                                 @PathVariable Long commentId,
                                                 @RequestBody @Valid CommentRequest request) {
        return commentService.updateComment(postId, commentId, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long postId,
                                              @PathVariable Long commentId) {
        boolean deleted = commentService.deleteComment(postId, commentId);
        return deleted ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}
