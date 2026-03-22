package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryDto {
    private String id;
    private String tenDanhMuc;
    private String slug;
    private String hinhAnh;
}
