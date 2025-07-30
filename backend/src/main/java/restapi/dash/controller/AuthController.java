package restapi.dash.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import restapi.dash.model.AppUser;
import restapi.dash.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AppUser signupAppUser) {
        if (userRepository.findByUsername(signupAppUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }
        String encodedPw = passwordEncoder.encode(signupAppUser.getPassword());
        userRepository.save(
                new AppUser(signupAppUser.getUsername(), encodedPw, "ROLE_USER"));
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인은 JWTAuthenticationFilter에서 처리하므로 별도 메서드가 필요 없음
}
