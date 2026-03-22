package com.minhanh.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms:86400000}")
    private long expirationMs;

    @Value("${jwt.refresh-expiration-ms:604800000}")
    private long refreshExpirationMs;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Tạo token từ email và vai trò
    public String generateToken(String email, String vaiTro) {
        return generateAccessToken(email, vaiTro);
    }

    public String generateAccessToken(String email, String vaiTro) {
        return Jwts.builder()
                .subject(email)
                .claim("token_type", "access")
                .claim("vai_tro", vaiTro)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getKey())
                .compact();
    }

    public String generateRefreshToken(String email, String vaiTro) {
        return Jwts.builder()
                .subject(email)
                .claim("token_type", "refresh")
                .claim("vai_tro", vaiTro)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshExpirationMs))
                .signWith(getKey())
                .compact();
    }

    // Lấy email từ token
    public String getEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Lấy vai trò từ token
    public String getVaiTro(String token) {
        return getClaims(token).get("vai_tro", String.class);
    }

    // Kiểm tra token còn hợp lệ không
    public boolean isValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isRefreshToken(String token) {
        try {
            String tokenType = getClaims(token).get("token_type", String.class);
            return "refresh".equalsIgnoreCase(tokenType);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isAccessToken(String token) {
        try {
            String tokenType = getClaims(token).get("token_type", String.class);
            return "access".equalsIgnoreCase(tokenType);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Giải mã token và trả về toàn bộ thông tin bên trong (Claims).
     * Logic:
     * 1. Jwts.parser()          → khởi tạo bộ đọc token
     * 2. verifyWith(getKey())   → dùng secret key để xác minh chữ ký token có hợp lệ không
     * 3. build()                → hoàn tất cấu hình parser
     * 4. parseSignedClaims(token) → đọc token, ném exception nếu sai/hết hạn
     * 5. getPayload()           → lấy phần dữ liệu bên trong (email, vai_tro, ngày hết hạn...)
     *
     * Hàm này được dùng nội bộ bởi getEmail(), getVaiTro(), isValid()
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
