package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "yeu_cau_tu_van")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class YeuCauTuVan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "yeu_cau_id", length = 36)
    private String yeuCauId;

    @Column(name = "ten_khach", nullable = false)
    private String tenKhach;

    @Column(name = "so_dien_thoai", length = 20, nullable = false)
    private String soDienThoai;

    @Column(name = "email")
    private String email;

    @Column(name = "noi_dung", columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "san_pham_id", length = 36)
    private String sanPhamId;

    @Column(name = "ngay_gui")
    private LocalDateTime ngayGui;

    @Column(name = "da_xu_ly")
    private Boolean daXuLy;

    @Column(name = "ghi_chu_noi_bo", columnDefinition = "TEXT")
    private String ghiChuNoiBo;

    @PrePersist
    protected void onCreate() {
        if (ngayGui == null) ngayGui = LocalDateTime.now();
        if (daXuLy == null) daXuLy = false;
    }
}
