package com.minhanh.backend.dto;

import lombok.Data;

@Data
public class BaiVietRequestDto {
    private String tieuDe;
    private String slug;
    private String noiDung;
    private String tomTat;
    private String anhDaiDien;
    private String danhMucId;
    private String trangThai; // "DRAFT", "PUBLISHED", "HIDDEN"
    private String tags;
}
