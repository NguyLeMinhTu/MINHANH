package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SlideDto {
    private String id;
    private String tieuDe;
    private String moTa;
    private String urlHinh;
    private String link;
    private Integer thuTu;
}
