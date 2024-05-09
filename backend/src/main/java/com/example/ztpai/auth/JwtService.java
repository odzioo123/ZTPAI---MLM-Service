package com.example.ztpai.auth;

import com.example.ztpai.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${spring.security.secret-key}")
    private String mySecretKey;

    public String extractUsername(String token)
    {
        return extractClaim(token, Claims::getSubject);
    }
    public Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }
    public boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }
    public String generateToken(User user) {
        return Jwts
                .builder()
                .subject(user.getUsername())
                .claim("role", user.getUserType().getName())
                .claim("id", user.getId())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .signWith(getSignInKey())
                .compact();
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(mySecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
