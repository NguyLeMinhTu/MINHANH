package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProductPageResponse {
    private List<CategoryDto> danhMuc;
    private List<ProductCardDto> sanPham;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
}
