package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "danh_muc_bai_viet")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DanhMucBaiViet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "danh_muc_bai_viet_id", length = 36)
    private String danhMucBaiVietId;

    @Column(name = "ten_danh_muc", length = 255)
    private String tenDanhMuc;

    @Column(name = "slug", length = 255)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @Column(name = "trang_thai")
    @Builder.Default
    private Boolean trangThai = true;
}
