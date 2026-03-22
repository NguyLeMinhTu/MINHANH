package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "nguoi_dung")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "nguoi_dung_id", length = 36)
    private String nguoiDungId;

    @Column(name = "ten")
    private String ten;

    @Column(unique = true)
    private String email;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(name = "anh_dai_dien", length = 500)
    private String anhDaiDien;

    @Column(name = "gioi_tinh", length = 10)
    private String gioiTinh;

    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;

    @Column(name = "dia_chi", columnDefinition = "TEXT")
    private String diaChi;

    @Column(name = "vai_tro", length = 50)
    private String vaiTro;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "reset_token_expire")
    private LocalDateTime resetTokenExpire;
}
