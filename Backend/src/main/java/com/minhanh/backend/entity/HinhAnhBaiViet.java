package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "hinh_anh_bai_viet")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class HinhAnhBaiViet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "hinh_anh_id", length = 36)
    private String hinhAnhId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bai_viet_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BaiViet baiViet;

    @Column(name = "url_anh", length = 500)
    private String urlAnh;
}
