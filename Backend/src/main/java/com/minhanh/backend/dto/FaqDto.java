package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FaqDto {
    private String id;
    private String cauHoi;
    private String traLoi;
    private Integer thuTu;
}
