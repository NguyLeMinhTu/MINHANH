package com.minhanh.backend.repository;

import com.minhanh.backend.entity.BaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, String> {
    
    Optional<BaiViet> findBySlug(String slug);
    
    boolean existsBySlug(String slug);

    @Query("SELECT b FROM BaiViet b ORDER BY b.ngayDang DESC")
    Page<BaiViet> findAllOrderByNgayDangDesc(Pageable pageable);

    Page<BaiViet> findByTieuDeContainingIgnoreCase(String tieuDe, Pageable pageable);

    @Query("SELECT b FROM BaiViet b WHERE b.trangThai = 'PUBLISHED' ORDER BY b.ngayDang DESC")
    Page<BaiViet> findPublishedOrderByNgayDangDesc(Pageable pageable);

    @Query("SELECT b FROM BaiViet b WHERE b.trangThai = 'PUBLISHED' AND b.danhMuc.slug = :slug ORDER BY b.ngayDang DESC")
    Page<BaiViet> findPublishedByDanhMucSlug(@org.springframework.data.repository.query.Param("slug") String slug, Pageable pageable);

    @Query("SELECT b FROM BaiViet b WHERE b.trangThai = 'PUBLISHED' AND b.danhMuc.slug = :catSlug AND b.slug <> :curSlug ORDER BY b.ngayDang DESC")
    List<BaiViet> findRelated(
        @org.springframework.data.repository.query.Param("catSlug") String catSlug,
        @org.springframework.data.repository.query.Param("curSlug") String curSlug,
        Pageable pageable
    );
}
