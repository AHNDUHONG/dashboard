package restapi.prac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import restapi.prac.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
