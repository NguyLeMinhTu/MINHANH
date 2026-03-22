package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lien_he")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LienHe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "lien_he_id", length = 36)
    private String lienHeId;

    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "email")
    private String email;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(name = "tieu_de")
    private String tieuDe;

    @Column(name = "noi_dung", columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "ngay_gui")
    private LocalDateTime ngayGui;

    @Column(name = "da_xu_ly")
    private Boolean daXuLy;
}
