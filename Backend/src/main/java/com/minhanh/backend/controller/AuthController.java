package com.minhanh.backend.controller;

import com.minhanh.backend.dto.RefreshTokenRequest;
import com.minhanh.backend.dto.RegisterRequest;
import com.minhanh.backend.dto.LoginRequest;
import com.minhanh.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * API đăng nhập, có kiểm soát tần suất thử sai theo IP + email.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String rateLimitKey = buildRateLimitKey(httpRequest, request.getEmail());
        return authService.login(request, rateLimitKey);
    }

    /**
     * API đăng ký tài khoản người dùng mới.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    /**
     * API cấp lại access token từ refresh token hợp lệ.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return authService.refreshToken(request);
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
