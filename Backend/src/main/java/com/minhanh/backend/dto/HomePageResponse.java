package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class HomePageResponse {
    private List<SlideDto> slides;
    private List<CategoryDto> danhMuc;
    private List<ProductCardDto> sanPhamNoiBat;
    private List<ProductCardDto> sanPhamMoi;
    private List<CollectionDto> collections;
    private List<FaqDto> faq;
}
