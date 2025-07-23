package restapi.prac.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import restapi.prac.model.Post;
import restapi.prac.repository.PostRepository;

import java.util.Optional;

@Service  // 이 클래스를 Spring의 서비스 레이어 컴포넌트(Bean)로 등록한다.
public class PostService {

    //final 키워드를 사용하여 PostRepository가 변경되지 않도록 한다.
    private final PostRepository postRepository;

    /**
     * 생성자 주입(Constructor Injection) 방식이다.
     * Spring 컨테이너가 PostService 객체를 생성할 때, PostRepository의 구현체(Bean)를 자동으로 주입해준다.
     * @param postRepository 게시글 데이터에 접근하기 위한 Repository
     */
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /**
     * 전체 게시글 목록을 페이지 단위로 조회합니다.
     * @param pageable 페이징 및 정렬 정보를 담고 있는 객체
     * @return 페이징 처리된 게시글 목록 (Page<Post>)
     */
    public Page<Post> getPosts(Pageable pageable){
        return postRepository.findAll(pageable);
    }

    /**
     * 특정 ID를 가진 게시글을 조회합니다.
     * @param id 조회할 게시글의 ID
     * @return 조회된 게시글. 게시글이 존재하지 않으면 Optional.empty()를 반환합니다.
     */
    public Optional<Post> getPost(Long id) {
        return postRepository.findById(id);
    }

    /**
     * 새로운 게시글을 생성하고 데이터베이스에 저장합니다.
     * @param post 생성할 게시글 정보를 담고 있는 객체
     * @return 데이터베이스에 저장된 게시글 객체 (ID가 포함됨)
     */
    public Post createPost(Post post){
        return postRepository.save(post);
    }

    /**
     * 기존 게시글의 내용을 수정합니다.
     * @param id 수정할 게시글의 ID
     * @param updatePost 수정할 내용을 담고 있는 게시글 객체
     * @return 수정이 완료된 게시글. 대상 게시글이 없으면 Optional.empty()를 반환합니다.
     */
    public Optional<Post> updatePost(Long id, Post updatePost){
        return postRepository.findById(id).map(post -> {
            post.setTitle(updatePost.getTitle());
            post.setContent(updatePost.getContent());
            return postRepository.save(post);
        });
    }

    /**
     * 특정 ID를 가진 게시글을 삭제합니다.
     * @param id 삭제할 게시글의 ID
     * @return 삭제 성공 시 true, 삭제할 게시글이 없어 실패 시 false를 반환합니다.
     */
    public boolean deletePost(Long id) {

        return postRepository.findById(id).map(post -> {
            postRepository.delete(post);
            return true;
        }).orElse(false);
    }

}
