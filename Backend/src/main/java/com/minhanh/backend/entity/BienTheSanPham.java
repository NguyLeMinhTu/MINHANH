package com.minhanh.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.math.BigDecimal;

@Entity
@Table(name = "bien_the_san_pham")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BienTheSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "bien_the_id", length = 36)
    private String bienTheId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "san_pham_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SanPham sanPham;

    @Column(name = "mau_sac", length = 50)
    private String mauSac;

    @Column(name = "size", length = 20)
    private String size;

    @Column(name = "gia", precision = 10, scale = 2)
    private BigDecimal gia;

    @Column(name = "so_luong")
    private Integer soLuong;
}
