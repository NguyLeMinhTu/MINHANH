package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "hinh_anh_san_pham")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class HinhAnhSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "hinh_anh_id", length = 36)
    private String hinhAnhId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "san_pham_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SanPham sanPham;

    @Column(name = "url_anh", length = 500)
    private String urlAnh;
}
