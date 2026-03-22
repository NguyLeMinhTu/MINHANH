package com.minhanh.backend.repository;

import com.minhanh.backend.entity.Slide;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlideRepository extends JpaRepository<Slide, String> {
    List<Slide> findByTrangThaiTrueOrderByThuTuAsc();
}
