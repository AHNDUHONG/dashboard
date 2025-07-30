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

    public String createToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() * expirationMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(secretKey)
                .compact();
    }

    public String validateAndGetUsername(String token) {
        Jws<Claims> claims =
                Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
        return claims.getBody().getSubject(); // 유효하지 않으면 예외 발생
    }

}
