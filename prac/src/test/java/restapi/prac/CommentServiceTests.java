package restapi.prac;


import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import restapi.prac.model.Comment;
import restapi.prac.model.Post;
import restapi.prac.repository.PostRepository;
import restapi.prac.service.CommentService;

@SpringBootTest
@Transactional
public class CommentServiceTests {

    @Autowired CommentService commentService;
    @Autowired PostRepository postRepository;

    @Test
    void CommentGetTest() {
        Post post = postRepository.save(new Post("제목", "내용"));
        Comment saved = commentService.createComment(post.getId(),
                new Comment(post, "댓글1"));

        assert(saved.getContent().equals("댓글1"));
        assert(commentService.getCommentsByPostId(post.getId()).size() == 1);
    }
}
