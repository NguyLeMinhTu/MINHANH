package com.minhanh.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class SanPhamRequestDto {
    private String tenSanPham;
    private String slug;
    private String moTa;
    private String metaTitle;
    private String metaDescription;
    private BigDecimal giaThamKhao;
    private BigDecimal giaBan;
    private BigDecimal giaKhuyenMai;
    private Integer soLuongTon;
    private String donViTinh;
    private String thuongHieu;
    private String xuatXu;
    private String chatLieu;
    private String baoQuan;
    private String tags;
    private Boolean spNoiBat;
    private Boolean spMoi;
    private String trangThai;
    private String danhMucId;
    private List<String> hinhAnh;
}
