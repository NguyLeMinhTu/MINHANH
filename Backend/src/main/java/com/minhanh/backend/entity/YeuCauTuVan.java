package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.time.LocalDateTime;

@Entity
@Table(name = "yeu_cau_tu_van")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class YeuCauTuVan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "yeu_cau_id", length = 36)
    private String yeuCauId;

    @Column(name = "ten_khach")
    private String tenKhach;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(name = "email")
    private String email;

    @Column(name = "noi_dung", columnDefinition = "TEXT")
    private String noiDung;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "san_pham_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private SanPham sanPham;

    @Column(name = "ngay_gui")
    private LocalDateTime ngayGui;

    @Column(name = "da_xu_ly")
    private Boolean daXuLy;

    @Column(name = "ghi_chu_noi_bo", columnDefinition = "TEXT")
    private String ghiChuNoiBo;
}
