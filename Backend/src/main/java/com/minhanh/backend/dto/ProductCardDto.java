package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class ProductCardDto {
    private String id;
    private String tenSanPham;
    private String slug;
    private BigDecimal giaBan;
    private BigDecimal giaKhuyenMai;
    private String anhDaiDien;
    private List<String> images; // Danh sách ảnh để hiển thị hover ở frontend
    private String danhMucId;
    private String danhMucTen;
    private String thuongHieu; // Thêm để lọc ở frontend
    private String chatLieu;   // Thêm để lọc ở frontend
    private String xuatXu;     // Thêm để lọc ở frontend (ví dụ: Việt Nam, Hàn Quốc)
    private Boolean spMoi;
    private Boolean spNoiBat;
    private Integer views;
}
