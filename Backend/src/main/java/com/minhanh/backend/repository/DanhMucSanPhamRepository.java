package com.minhanh.backend.repository;

import com.minhanh.backend.entity.DanhMucSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DanhMucSanPhamRepository extends JpaRepository<DanhMucSanPham, String> {
    // Tìm tất cả danh mục cha (không có parent)
    List<DanhMucSanPham> findByParentIsNull();

    // Tìm theo slug
    Optional<DanhMucSanPham> findBySlug(String slug);

    // Kiểm tra slug đã tồn tại chưa
    boolean existsBySlug(String slug);

    List<DanhMucSanPham> findByTrangThaiTrueOrderByThuTuAsc();

    List<DanhMucSanPham> findTop8ByTrangThaiTrueOrderByThuTuAsc();

    List<DanhMucSanPham> findByParentOrderByThuTuAsc(DanhMucSanPham parent);
}
