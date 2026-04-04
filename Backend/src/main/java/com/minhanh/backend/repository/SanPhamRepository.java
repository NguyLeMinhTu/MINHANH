package com.minhanh.backend.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.minhanh.backend.entity.SanPham;

public interface SanPhamRepository extends JpaRepository<SanPham, String>, JpaSpecificationExecutor<SanPham> {

        // Tìm 1 sản phẩm theo slug (dùng cho trang chi tiết sản phẩm).
        Optional<SanPham> findBySlug(String slug);

        Optional<SanPham> findBySlugAndTrangThai(String slug, String trangThai);

        Optional<SanPham> findBySanPhamIdAndTrangThai(String sanPhamId, String trangThai);

        long countByTrangThai(String trangThai);

    // Lấy toàn bộ public có phân trang
    Page<SanPham> findByTrangThai(String trangThai, Pageable pageable);

    // Public + danh mục
    Page<SanPham> findByTrangThaiAndDanhMuc_DanhMucId(
            String trangThai,
            String danhMucId,
            Pageable pageable
    );

    // Xử lý logic xóa danh mục
    @Transactional
    @Modifying
    @Query("UPDATE SanPham s SET s.danhMuc = (SELECT dm FROM DanhMucSanPham dm WHERE dm.danhMucId = :newId) WHERE s.danhMuc.danhMucId = :oldId")
    void migrateProductsToParent(@Param("oldId") String oldId, @Param("newId") String newId);

    @Transactional
    @Modifying
    @Query("DELETE FROM SanPham s WHERE s.danhMuc.danhMucId = :danhMucId")
    void deleteByDanhMucId(@Param("danhMucId") String danhMucId);

    @Transactional
    @Modifying
    @Query("DELETE FROM SanPham s WHERE s.danhMuc.danhMucId IN :ids")
    void deleteByDanhMucIdIn(@Param("ids") List<String> ids);

    // Public + sản phẩm mới
    Page<SanPham> findByTrangThaiAndSpMoi(
            String trangThai,
            Boolean spMoi,
            Pageable pageable
    );

    // Public + nổi bật
    Page<SanPham> findByTrangThaiAndSpNoiBat(
            String trangThai,
            Boolean spNoiBat,
            Pageable pageable
    );

    // Public + tìm theo tên
    Page<SanPham> findByTrangThaiAndTenSanPhamContainingIgnoreCase(
            String trangThai,
            String q,
            Pageable pageable
    );

    @Transactional
    @Modifying
    @Query("UPDATE SanPham s SET s.views = s.views + 1 WHERE s.sanPhamId = :id")
    void incrementViews(@Param("id") String id);

    List<SanPham> findTop10ByTrangThaiAndSpNoiBatTrueOrderByNgayTaoDesc(String trangThai);

        List<SanPham> findTop10ByTrangThaiAndSpMoiTrueOrderByNgayTaoDesc(String trangThai);
}