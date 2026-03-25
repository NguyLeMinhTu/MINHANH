package com.minhanh.backend.repository;

import com.minhanh.backend.entity.BaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, String> {
    
    Optional<BaiViet> findBySlug(String slug);
    
    boolean existsBySlug(String slug);

    @Query("SELECT b FROM BaiViet b ORDER BY b.ngayDang DESC")
    Page<BaiViet> findAllOrderByNgayDangDesc(Pageable pageable);

    Page<BaiViet> findByTieuDeContainingIgnoreCase(String tieuDe, Pageable pageable);
}
