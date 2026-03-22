package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.util.List;

@Entity
@Table(name = "danh_muc_san_pham")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DanhMucSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "danh_muc_id", length = 36)
    private String danhMucId;

    @Column(name = "ten_danh_muc", nullable = false)
    private String tenDanhMuc;

    @Column(unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private DanhMucSanPham parent;

    @OneToMany(mappedBy = "parent")
    private List<DanhMucSanPham> children;

    @Column(name = "hinh_anh", length = 500)
    private String hinhAnh;

    @Column(name = "thu_tu")
    private Integer thuTu;

    @Column(name = "trang_thai")
    private Boolean trangThai = true;
}
