package restapi.prac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import restapi.prac.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
