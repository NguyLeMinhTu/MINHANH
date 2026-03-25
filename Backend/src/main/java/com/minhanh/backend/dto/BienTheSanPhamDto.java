package com.minhanh.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class BienTheSanPhamDto {
    private String bienTheId; // Nếu cập nhật
    private String mauSac;
    private String size;
    private BigDecimal gia;
    private Integer soLuong;
}
