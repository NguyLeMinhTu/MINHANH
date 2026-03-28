package com.minhanh.backend.controller;
import com.minhanh.backend.dto.RegisterRequest;
import com.minhanh.backend.dto.LoginRequest;
import com.minhanh.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * API đăng nhập, có kiểm soát tần suất thử sai theo IP + email.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, 
                                   HttpServletRequest httpRequest, 
                                   HttpServletResponse httpResponse) {
        String rateLimitKey = buildRateLimitKey(httpRequest, request.getEmail());
        return authService.login(request, rateLimitKey, httpResponse);
    }

    /**
     * API đăng ký tài khoản người dùng mới.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, HttpServletResponse response) {
        return authService.register(request, response);
    }

    /**
     * API cấp lại access token từ refresh token hợp lệ.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("refresh_token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        return authService.refreshToken(refreshToken, response);
    }

    /**
     * API đăng xuất, xóa cookie token.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok(Map.of("message", "Đã đăng xuất thành công"));
    }

    /**
     * API kiểm tra token còn hợp lệ không (dùng cho frontend polling).
     * Spring Security tự trả 401 nếu cookie hết hạn hoặc không hợp lệ.
     */
    @GetMapping("/me")
    public ResponseEntity<?> me(org.springframework.security.core.Authentication authentication) {
        return ResponseEntity.ok(Map.of("email", authentication.getName()));
    }

    /**
     * Tạo key rate-limit dạng IP:email để phân biệt từng nguồn đăng nhập.
     */
    private String buildRateLimitKey(HttpServletRequest request, String email) {
        String ip = request.getRemoteAddr();
        String normalizedEmail = email == null ? "unknown" : email.trim().toLowerCase();
        return ip + ":" + normalizedEmail;
    }
}
