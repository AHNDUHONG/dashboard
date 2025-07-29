package restapi.prac.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import restapi.prac.dto.post.PostRequest;
import restapi.prac.dto.post.PostResponse;
import restapi.prac.model.Post;
import restapi.prac.repository.PostRepository;

import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
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
    public Optional<PostResponse> getPost(Long id) {
        return postRepository.findById(id)
                .map(this::toResponse);
    }

    // 생성
    public PostResponse createPost(PostRequest request) {
        Post post = new Post(request.getTitle(), request.getContent());
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
                post.getCreatedAt()
        );
    }
}
