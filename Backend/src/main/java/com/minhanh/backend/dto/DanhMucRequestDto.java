package com.minhanh.backend.dto;

import lombok.Data;

@Data
public class DanhMucRequestDto {
    private String tenDanhMuc;
    private String slug;
    private String moTa;
    private String hinhAnh;
    private Integer thuTu;
    private Boolean trangThai;
    private String parentId;
}
