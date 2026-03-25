package com.minhanh.backend.dto;

import lombok.Data;

@Data
public class DanhMucBaiVietRequestDto {
    private String tenDanhMuc;
    private String slug;
    private String moTa;
    private Boolean trangThai;
}
