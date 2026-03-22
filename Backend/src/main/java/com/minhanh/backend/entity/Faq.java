package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faq")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "faq_id", length = 36)
    private String faqId;

    @Column(name = "cau_hoi", columnDefinition = "TEXT")
    private String cauHoi;

    @Column(name = "tra_loi", columnDefinition = "TEXT")
    private String traLoi;

    @Column(name = "thu_tu")
    private Integer thuTu;

    @Column(name = "trang_thai")
    private Boolean trangThai;
}
