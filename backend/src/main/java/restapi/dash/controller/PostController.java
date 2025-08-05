package restapi.dash.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import restapi.dash.dto.post.PostRequest;
import restapi.dash.dto.post.PostResponse;
import restapi.dash.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // 게시글 목록
    @GetMapping
    public ResponseEntity<Page<PostResponse>> listPost(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(postService.getPosts(pageable));
    }

    // 게시글 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPost(id));  // 예외 발생 시 404는 GlobalExceptionHandler가 처리
    }

    // 게시글 작성
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody @Valid PostRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(postService.createPost(request, username));
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long id,
                                                   @RequestBody @Valid PostRequest request,
                                                   @AuthenticationPrincipal String username) {
        return postService.updatePost(id, request, username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(403).build());
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id,
                                           @AuthenticationPrincipal String username) {
        boolean deleted = postService.deletePost(id, username);
        return deleted ? ResponseEntity.ok().build()
                : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
