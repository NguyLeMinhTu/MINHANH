package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProductCardDto {
    private String id;
    private String tenSanPham;
    private String slug;
    private BigDecimal giaBan;
    private BigDecimal giaKhuyenMai;
    private String anhDaiDien;
    private String danhMucId;
    private String danhMucTen;
    private Boolean spMoi;
    private Boolean spNoiBat;
}
