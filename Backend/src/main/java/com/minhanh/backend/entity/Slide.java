package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "slide")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Slide {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "slide_id", length = 36)
    private String slideId;

    @Column(name = "tieu_de")
    private String tieuDe;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @Column(name = "url_hinh", length = 500)
    private String urlHinh;

    @Column(name = "link", length = 500)
    private String link;

    @Column(name = "thu_tu")
    private Integer thuTu;

    @Column(name = "trang_thai")
    private Boolean trangThai;
}
