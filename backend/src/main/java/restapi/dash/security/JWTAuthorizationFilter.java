package restapi.dash.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTAuthorizationFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        System.out.println("🛠️ JWTAuthorizationFilter 생성됨");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException {

        //  OPTIONS 요청은 CORS preflight 요청 → 그냥 통과시킴
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

// 1. 클라이언트 요청 헤더에서 Authorization: Bearer <JWT> 읽고
        String header = request.getHeader("Authorization");
        System.out.println("🛠️ [2] Authorization 헤더 = " + header);
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                // 2. 토큰 파싱 및 검증
                String username = jwtUtil.validateAndGetUsername(token);

                // 권한 추출: "ROLE_USER" 문자열 -> GrantedAuthority 리스트로 변환
                String roles = jwtUtil.getRoles(token);   //JWT에서 roles claim 꺼냄
                List<SimpleGrantedAuthority> authorities = Arrays.stream(roles.split(","))
                        .map(SimpleGrantedAuthority::new)
                        .toList();

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);
                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                System.out.println("✅ JWT 필터 통과: 사용자 = " + username);
                System.out.println("✅ 권한 목록 = " + authorities);

                // 3. 인증 객체 생성해서 SecurityContext에 등록
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                // 토큰 검증 실패 시 무시하고 계속 진행
            }
        }

        filterChain.doFilter(request, response);
    }
}
