package com.minhanh.backend.repository;

import com.minhanh.backend.entity.DanhMucBaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DanhMucBaiVietRepository extends JpaRepository<DanhMucBaiViet, String> {
    Optional<DanhMucBaiViet> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
