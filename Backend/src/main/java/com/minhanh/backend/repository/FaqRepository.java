package com.minhanh.backend.repository;

import com.minhanh.backend.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, String> {
    List<Faq> findByTrangThaiTrueOrderByThuTuAsc();
}
