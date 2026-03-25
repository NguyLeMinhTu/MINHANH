package com.minhanh.backend.repository;

import com.minhanh.backend.entity.YeuCauTuVan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface YeuCauTuVanRepository extends JpaRepository<YeuCauTuVan, String> {
    
    @Query("SELECT y FROM YeuCauTuVan y WHERE " +
           "(:search IS NULL OR :search = '' OR y.soDienThoai = :search) AND " +
           "(:daXuLy IS NULL OR y.daXuLy = :daXuLy) " +
           "ORDER BY y.ngayGui DESC")
    Page<YeuCauTuVan> searchByAdmin(@Param("search") String search, @Param("daXuLy") Boolean daXuLy, Pageable pageable);

    Page<YeuCauTuVan> findAllByOrderByNgayGuiDesc(Pageable pageable);
    Page<YeuCauTuVan> findByDaXuLyOrderByNgayGuiDesc(Boolean daXuLy, Pageable pageable);
}
