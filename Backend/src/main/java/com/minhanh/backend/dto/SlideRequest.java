package com.minhanh.backend.dto;

import lombok.Data;

@Data
public class SlideRequest {
    private String tieuDe;
    private String moTa;
    private String urlHinh;
    private String link;
    private Integer thuTu;
    private Boolean trangThai;
}
