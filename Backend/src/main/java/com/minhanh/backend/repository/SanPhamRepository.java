package com.minhanh.backend.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.minhanh.backend.entity.SanPham;

public interface SanPhamRepository extends JpaRepository<SanPham, String>, JpaSpecificationExecutor<SanPham> {

        // Tìm 1 sản phẩm theo slug (dùng cho trang chi tiết sản phẩm).
        Optional<SanPham> findBySlug(String slug);

        Optional<SanPham> findBySlugAndTrangThai(String slug, String trangThai);

        Optional<SanPham> findBySanPhamIdAndTrangThai(String sanPhamId, String trangThai);

    // Lấy toàn bộ public có phân trang
    Page<SanPham> findByTrangThai(String trangThai, Pageable pageable);

    // Public + danh mục
    Page<SanPham> findByTrangThaiAndDanhMuc_DanhMucId(
            String trangThai,
            String danhMucId,
            Pageable pageable
    );

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

        List<SanPham> findTop8ByTrangThaiAndSpNoiBatTrueOrderByNgayTaoDesc(String trangThai);

        List<SanPham> findTop8ByTrangThaiAndSpMoiTrueOrderByNgayTaoDesc(String trangThai);
}