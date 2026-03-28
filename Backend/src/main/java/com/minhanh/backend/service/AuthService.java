package com.minhanh.backend.service;

import com.minhanh.backend.dto.AuthResponse;
import com.minhanh.backend.dto.LoginRequest;
import com.minhanh.backend.dto.RefreshTokenRequest;
import com.minhanh.backend.dto.RegisterRequest;
import com.minhanh.backend.entity.NguoiDung;
import com.minhanh.backend.repository.NguoiDungRepository;
import com.minhanh.backend.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final NguoiDungRepository nguoiDungRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthRateLimitService authRateLimitService;

    public ResponseEntity<?> login(LoginRequest request, String rateLimitKey, HttpServletResponse response) {
        if (!authRateLimitService.allowLoginAttempt(rateLimitKey)) {
            return ResponseEntity.status(429).body(Map.of(
                    "message", "Bạn đã đăng nhập sai quá nhiều lần, vui lòng thử lại sau"
            ));
        }

        Optional<NguoiDung> optional = nguoiDungRepository.findByEmail(request.getEmail());
        if (optional.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
        }

        NguoiDung user = optional.get();
        if (!passwordEncoder.matches(request.getMatKhau(), user.getMatKhau())) {
            return ResponseEntity.status(401).body(Map.of("message", "Email hoặc mật khẩu không đúng"));
        }

        if (Boolean.FALSE.equals(user.getTrangThai())) {
            return ResponseEntity.status(403).body(Map.of("message", "Tài khoản đã bị khóa"));
        }

        authRateLimitService.clearAttempts(rateLimitKey);

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getVaiTro());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getVaiTro());

        // Thiết lập Cookie
        addCookie(response, "access_token", accessToken, 60 * 60); // 1 giờ
        addCookie(response, "refresh_token", refreshToken, 24 * 60 * 60); // 1 ngày

        return ResponseEntity.ok(new AuthResponse(
                null, // Không gửi token trong body nữa
                null, 
                "Cookie",
                user.getEmail(),
                user.getTen(),
                user.getVaiTro()
        ));
    }

    public ResponseEntity<?> register(RegisterRequest request, HttpServletResponse response) {
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

        // Thiết lập Cookie
        addCookie(response, "access_token", accessToken, 60 * 60); // 1 giờ
        addCookie(response, "refresh_token", refreshToken, 24 * 60 * 60); // 1 ngày

        return ResponseEntity.ok(new AuthResponse(
                null,
                null,
                "Cookie",
                savedUser.getEmail(),
                savedUser.getTen(),
                savedUser.getVaiTro()
        ));
    }

    public ResponseEntity<?> refreshToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null || !jwtUtil.isValid(refreshToken) || !jwtUtil.isRefreshToken(refreshToken)) {
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
        addCookie(response, "access_token", newAccessToken, 60 * 60); // 1 giờ

        return ResponseEntity.ok(Map.of(
                "message", "Token đã được làm mới",
                "tokenType", "Cookie"
        ));
    }

    private void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Đặt true nếu chạy HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    public void logout(HttpServletResponse response) {
        clearCookie(response, "access_token");
        clearCookie(response, "refresh_token");
    }

    private void clearCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
