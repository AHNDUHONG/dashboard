package restapi.dash.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import restapi.dash.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 제목 또는 내용에 키워드가 포함된 게시글만 조회
    Page<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
            String titleKeyword,
            String contentKeyword,
            Pageable pageable
    );

}
