package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DanhMucMenuDto {
    private String id;
    private String tenDanhMuc;
    private String slug;
    private List<DanhMucMenuDto> children;
}
