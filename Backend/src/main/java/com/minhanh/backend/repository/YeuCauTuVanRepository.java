package com.minhanh.backend.repository;

import com.minhanh.backend.entity.YeuCauTuVan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YeuCauTuVanRepository extends JpaRepository<YeuCauTuVan, String> {
    
    long countByDaXuLy(Boolean daXuLy);

    Page<YeuCauTuVan> findAllByOrderByNgayGuiDesc(Pageable pageable);

    Page<YeuCauTuVan> findByDaXuLyOrderByNgayGuiDesc(Boolean daXuLy, Pageable pageable);
    
    Page<YeuCauTuVan> findBySoDienThoaiOrderByNgayGuiDesc(String soDienThoai, Pageable pageable);
    
    Page<YeuCauTuVan> findBySoDienThoaiAndDaXuLyOrderByNgayGuiDesc(String soDienThoai, Boolean daXuLy, Pageable pageable);
}
