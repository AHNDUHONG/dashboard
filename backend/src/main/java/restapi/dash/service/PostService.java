package restapi.dash.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public Page<PostResponse> getPosts(Pageable pageable, String keyword) {
        // 정렬 기준 강제 적용: createdAt 기준 내림차순
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Page<Post> postPage;
        if (keyword != null && !keyword.trim().isEmpty()) {
            postPage = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
                    keyword, keyword, sortedPageable
            );
        } else {
            postPage = postRepository.findAll(sortedPageable);
        }

        return postPage.map(this::toResponse);
    }

    // 단일 조회
    @Transactional
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("게시글을 찾을 수 없습니다."));

        // 조회수 증가 로직
        post.setViews(post.getViews() + 1);

        return toResponse(post);
    }

    // 생성
    public PostResponse createPost(PostRequest request, String username) {
        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자입니다."));

        Post post = new Post(request.getTitle(), request.getContent(), user); // 작성자 포함된 생성자 사용
        return toResponse(postRepository.save(post));
    }

    // 수정
    public Optional<PostResponse> updatePost(Long id, PostRequest request, String username) {
        return postRepository.findById(id).filter(post -> {
            AppUser author = post.getAuthor();
            return author != null && author.getUsername().equals(username); // 작성자 검증
        }).map(post -> {
            post.setTitle(request.getTitle());
            post.setContent(request.getContent());
            return toResponse(postRepository.save(post));
        });
    }

    // 삭제
    public boolean deletePost(Long id, String username) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isEmpty()) return false;

        Post post = optionalPost.get();

        // 작성자 정보가 없으면 삭제 불가
        if (post.getAuthor() == null) return false;


        // 작성자가 아닌 경우 삭제 불가
        if (!post.getAuthor().getUsername().equals(username)) return false;

        postRepository.delete(post);
        return true;
    }

    // 변환 메서드
    private PostResponse toResponse(Post post) {
        String authorUsername = post.getAuthor() != null ? post.getAuthor().getUsername() : "알 수 없음";

        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt(),
                authorUsername, // 작성자 정보 전달
                post.getViews()
        );
    }
}
