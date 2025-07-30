package restapi.dash.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import restapi.dash.model.AppUser;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}
