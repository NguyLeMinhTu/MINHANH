package com.minhanh.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "thong_ke")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongKe {

    @Id
    @Column(name = "ma_thong_ke", unique = true, nullable = false)
    private String maThongKe;

    @Column(name = "gia_tri")
    private Long giaTri;
}
