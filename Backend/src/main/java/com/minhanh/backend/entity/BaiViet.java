package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "bai_viet")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BaiViet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "bai_viet_id", length = 36)
    private String baiVietId;

    @Column(name = "tieu_de")
    private String tieuDe;

    @Column(name = "slug")
    private String slug;

    @Column(name = "noi_dung", columnDefinition = "LONGTEXT")
    private String noiDung;

    @Column(name = "tom_tat", columnDefinition = "TEXT")
    private String tomTat;

    @Column(name = "anh_dai_dien", length = 500)
    private String anhDaiDien;

    @Column(name = "views")
    private Integer views;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(name = "trang_thai", length = 50)
    private String trangThai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "danh_muc_bai_viet_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private DanhMucBaiViet danhMuc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nguoi_dung_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private NguoiDung nguoiDung;

    @Column(name = "ngay_dang")
    private LocalDateTime ngayDang;

    @OneToMany(mappedBy = "baiViet", cascade = CascadeType.ALL)
    private List<HinhAnhBaiViet> hinhAnh;
}
