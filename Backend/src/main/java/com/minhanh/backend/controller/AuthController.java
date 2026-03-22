package com.minhanh.backend.controller;

import com.minhanh.backend.dto.AuthResponse;
import com.minhanh.backend.dto.RefreshTokenRequest;
import com.minhanh.backend.dto.RegisterRequest;
import com.minhanh.backend.dto.LoginRequest;
import com.minhanh.backend.entity.NguoiDung;
import com.minhanh.backend.exception.TooManyRequestsException;
import com.minhanh.backend.repository.NguoiDungRepository;
import com.minhanh.backend.security.JwtUtil;
import com.minhanh.backend.service.AuthRateLimitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDateTime;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final NguoiDungRepository nguoiDungRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthRateLimitService authRateLimitService;

    /**
     * API đăng nhập, có kiểm soát tần suất thử sai theo IP + email.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String rateLimitKey = buildRateLimitKey(httpRequest, request.getEmail());
        if (!authRateLimitService.allowLoginAttempt(rateLimitKey)) {
            throw new TooManyRequestsException("Bạn đã đăng nhập sai quá nhiều lần, vui lòng thử lại sau");
        }

        // 1. Tìm user theo email
        Optional<NguoiDung> optional = nguoiDungRepository.findByEmail(request.getEmail());

        if (optional.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
        }

        NguoiDung user = optional.get();

        // 2. Kiểm tra mật khẩu
        if (!passwordEncoder.matches(request.getMatKhau(), user.getMatKhau())) {
            return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
        }

        // 3. Kiểm tra tài khoản còn hoạt động không
        if (Boolean.FALSE.equals(user.getTrangThai())) {
            return ResponseEntity.status(403).body(Map.of("message", "Tài khoản đã bị khóa"));
        }

        authRateLimitService.clearAttempts(rateLimitKey);

        // 4. Tạo access token + refresh token
        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getVaiTro());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getVaiTro());

        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                user.getEmail(),
                user.getTen(),
                user.getVaiTro()
        ));
    }

    /**
     * API đăng ký tài khoản người dùng mới.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (nguoiDungRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email đã tồn tại"));
        }

        NguoiDung user = NguoiDung.builder()
                .ten(request.getTen())
                .email(request.getEmail())
                .matKhau(passwordEncoder.encode(request.getMatKhau()))
                .soDienThoai(request.getSoDienThoai())
                .vaiTro("USER")
                .trangThai(true)
                .ngayTao(LocalDateTime.now())
                .build();

        NguoiDung savedUser = nguoiDungRepository.save(user);

        String accessToken = jwtUtil.generateAccessToken(savedUser.getEmail(), savedUser.getVaiTro());
        String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail(), savedUser.getVaiTro());

        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                savedUser.getEmail(),
                savedUser.getTen(),
                savedUser.getVaiTro()
        ));
    }

    /**
     * API cấp lại access token từ refresh token hợp lệ.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        if (!jwtUtil.isValid(refreshToken) || !jwtUtil.isRefreshToken(refreshToken)) {
            return ResponseEntity.status(401).body(Map.of("message", "Refresh token không hợp lệ"));
        }

        String email = jwtUtil.getEmail(refreshToken);
        Optional<NguoiDung> optional = nguoiDungRepository.findByEmail(email);
        if (optional.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Người dùng không tồn tại"));
        }

        NguoiDung user = optional.get();
        if (Boolean.FALSE.equals(user.getTrangThai())) {
            return ResponseEntity.status(403).body(Map.of("message", "Tài khoản đã bị khóa"));
        }

        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getVaiTro());

        return ResponseEntity.ok(Map.of(
                "accessToken", newAccessToken,
                "tokenType", "Bearer"
        ));
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
