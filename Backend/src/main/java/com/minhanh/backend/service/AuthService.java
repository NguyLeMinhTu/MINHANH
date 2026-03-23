package com.minhanh.backend.service;

import com.minhanh.backend.dto.AuthResponse;
import com.minhanh.backend.dto.LoginRequest;
import com.minhanh.backend.dto.RefreshTokenRequest;
import com.minhanh.backend.dto.RegisterRequest;
import com.minhanh.backend.entity.NguoiDung;
import com.minhanh.backend.repository.NguoiDungRepository;
import com.minhanh.backend.security.JwtUtil;
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

    public ResponseEntity<?> login(LoginRequest request, String rateLimitKey) {
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

        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                user.getEmail(),
                user.getTen(),
                user.getVaiTro()
        ));
    }

    public ResponseEntity<?> register(RegisterRequest request) {
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

    public ResponseEntity<?> refreshToken(RefreshTokenRequest request) {
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
}
