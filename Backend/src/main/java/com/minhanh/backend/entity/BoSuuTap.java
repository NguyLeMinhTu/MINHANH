package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bo_suu_tap")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BoSuuTap {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "collection_id", length = 36)
    private String id;

    @Column(nullable = false)
    private String tieuDe;

    @Column(length = 500)
    private String moTa;

    @Column(length = 500)
    private String urlHinh;

    private String link;

    private Integer thuTu;

    @Builder.Default
    @Column(name = "trang_thai", length = 10)
    private String trangThai = "hien";
}
