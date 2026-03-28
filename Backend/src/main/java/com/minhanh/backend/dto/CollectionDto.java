package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectionDto {
    private String id;
    private String tieuDe;
    private String moTa;
    private String urlHinh;
    private String link;
    private Integer thuTu;
    private String trangThai;
}
