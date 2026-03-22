package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.util.List;

@Entity
@Table(name = "danh_muc_bai_viet")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DanhMucBaiViet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "danh_muc_bai_viet_id", length = 36)
    private String danhMucBaiVietId;

    @Column(name = "ten_danh_muc")
    private String tenDanhMuc;

    @Column(name = "slug")
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private DanhMucBaiViet parent;

    @OneToMany(mappedBy = "parent")
    private List<DanhMucBaiViet> children;
}
