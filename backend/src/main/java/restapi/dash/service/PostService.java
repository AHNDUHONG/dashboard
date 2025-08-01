package restapi.dash.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import restapi.dash.dto.post.PostRequest;
import restapi.dash.dto.post.PostResponse;
import restapi.dash.exception.ResourceNotFoundException;
import restapi.dash.model.AppUser;
import restapi.dash.model.Post;
import restapi.dash.repository.PostRepository;
import restapi.dash.repository.UserRepository;

import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // 목록
    public Page<PostResponse> getPosts(Pageable pageable) {
        // 정렬 기준 강제 적용: createdAt 기준 내림차순
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return postRepository.findAll(sortedPageable)
                                .map(this::toResponse);
    }

    // 단일 조회
    public PostResponse getPost(Long id) {
        return postRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));
    }

    // 생성
    public PostResponse createPost(PostRequest request, String username) {
        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자입니다."));

        Post post = new Post(request.getTitle(), request.getContent());
        post.setAuthor(user);   // 작성자 설정
        return toResponse(postRepository.save(post));
    }

    // 수정
    public Optional<PostResponse> updatePost(Long id, PostRequest request) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(request.getTitle());
            post.setContent(request.getContent());
            return toResponse(postRepository.save(post));
        });
    }

    // 삭제
    public boolean deletePost(Long id) {
        return postRepository.findById(id).map(post -> {
            postRepository.delete(post);
            return true;
        }).orElse(false);
    }

    // 변환 메서드
    private PostResponse toResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt(),
                post.getAuthor().getUsername() // 작성자 정보 전달
        );
    }
}
