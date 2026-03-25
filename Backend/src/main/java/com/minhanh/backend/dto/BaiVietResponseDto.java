package com.minhanh.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaiVietResponseDto {
    private String baiVietId;
    private String tieuDe;
    private String slug;
    private String noiDung;
    private String tomTat;
    private String anhDaiDien;
    private Integer views;
    private String tags;
    private String trangThai;
    private LocalDateTime ngayDang;
    private DanhMucDto danhMuc;
    private List<String> hinhAnh; // Chỉ cần trả về danh sách URL ảnh cho gọn

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DanhMucDto {
        private String danhMucBaiVietId;
        private String tenDanhMuc;
        private String slug;
    }
}
