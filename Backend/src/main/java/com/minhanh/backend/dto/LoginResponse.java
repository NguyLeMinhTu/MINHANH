package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// Dữ liệu server trả về sau khi đăng nhập thành công
@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String email;
    private String ten;
    private String vaiTro;
}
