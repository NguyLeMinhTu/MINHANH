package com.minhanh.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. Lấy header Authorization
        String authHeader = request.getHeader("Authorization");

        // 2. Nếu không có token → bỏ qua, để Spring Security tự xử lý
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Tách lấy token (bỏ chữ "Bearer ")
        String token = authHeader.substring(7);

        // 4. Kiểm tra token hợp lệ
        if (!jwtUtil.isValid(token) || !jwtUtil.isAccessToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 5. Lấy thông tin user từ token
        String email = jwtUtil.getEmail(token);
        String vaiTro = jwtUtil.getVaiTro(token);

        // 6. Đăng ký user vào SecurityContext (Spring Security nhận ra đây là user đã xác thực)
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_" + vaiTro.toUpperCase()))
                );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
