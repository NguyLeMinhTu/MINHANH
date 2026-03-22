package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "san_pham")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "san_pham_id", length = 36)
    private String sanPhamId;

    @Column(name = "ten_san_pham")
    private String tenSanPham;

    @Column(unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT")
    private String metaDescription;

    @Column(name = "gia_tham_khao", precision = 12, scale = 2)
    private BigDecimal giaThamKhao;

    @Column(name = "gia_ban", precision = 12, scale = 2)
    private BigDecimal giaBan;

    @Column(name = "gia_khuyen_mai", precision = 12, scale = 2)
    private BigDecimal giaKhuyenMai;

    @Column(name = "so_luong_ton")
    private Integer soLuongTon;

    @Column(name = "don_vi_tinh", length = 50)
    private String donViTinh;

    @Column(name = "thuong_hieu")
    private String thuongHieu;

    @Column(name = "xuat_xu")
    private String xuatXu;

    @Column(name = "chat_lieu", columnDefinition = "TEXT")
    private String chatLieu;

    @Column(name = "bao_quan", columnDefinition = "TEXT")
    private String baoQuan;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(name = "views")
    private Integer views = 0;

    @Column(name = "luot_mua")
    private Integer luotMua = 0;

    @Column(name = "sp_noi_bat")
    private Boolean spNoiBat;

    @Column(name = "sp_moi")
    private Boolean spMoi;

    @Column(name = "trang_thai", length = 50)
    private String trangThai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "danh_muc_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private DanhMucSanPham danhMuc;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<BienTheSanPham> bienThe;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<HinhAnhSanPham> hinhAnh;
}
