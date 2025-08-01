package restapi.dash.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {

    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long expirationMs = 1000 * 60 * 60;

    public String createToken(String username, String roles) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(secretKey)
                .compact();
    }

    public String getRoles(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .get("roles", String.class); // JWT에 "roles" claim이 있어야 함
    }

    public String validateAndGetUsername(String token) {
        Jws<Claims> claims =
                Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
        return claims.getBody().getSubject(); // 유효하지 않으면 예외 발생
    }

}
