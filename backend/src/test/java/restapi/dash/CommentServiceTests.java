package restapi.dash;


import jakarta.transaction.Transactional;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
public class CommentServiceTests {

//    @Autowired CommentService commentService;
//    @Autowired PostRepository postRepository;
//
//    @Test
//    void CommentGetTest() {
//        Post post = postRepository.save(new Post("제목", "내용"));
//        Comment saved = commentService.createComment(post.getId(),
//                new Comment(post, "댓글1"));
//
//        assert(saved.getContent().equals("댓글1"));
//        assert(commentService.getCommentsByPostId(post.getId()).size() == 1);
//    }
}
