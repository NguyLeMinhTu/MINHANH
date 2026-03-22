package com.minhanh.backend.service;

import com.minhanh.backend.entity.DanhMucSanPham;
import com.minhanh.backend.repository.DanhMucSanPhamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DanhMucSanPhamService {

    private final DanhMucSanPhamRepository repository;

    // Lấy tất cả danh mục
    public List<DanhMucSanPham> getAll() {
        return repository.findAll();
    }

    // Lấy chỉ danh mục cha
    public List<DanhMucSanPham> getDanhMucCha() {
        return repository.findByParentIsNull();
    }

    // Lấy 1 danh mục theo ID
    public DanhMucSanPham getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục ID: " + id));
    }

    // Tạo mới
    public DanhMucSanPham create(DanhMucSanPham danhMuc) {
        if (repository.existsBySlug(danhMuc.getSlug())) {
            throw new RuntimeException("Slug đã tồn tại: " + danhMuc.getSlug());
        }
        return repository.save(danhMuc);
    }

    // Cập nhật
    public DanhMucSanPham update(String id, DanhMucSanPham updated) {
        DanhMucSanPham existing = getById(id);
        existing.setTenDanhMuc(updated.getTenDanhMuc());
        existing.setSlug(updated.getSlug());
        existing.setMoTa(updated.getMoTa());
        existing.setHinhAnh(updated.getHinhAnh());
        existing.setThuTu(updated.getThuTu());
        existing.setTrangThai(updated.getTrangThai());
        existing.setParent(updated.getParent());
        return repository.save(existing);
    }

    // Xóa
    public void delete(String id) {
        getById(id); // Kiểm tra tồn tại trước
        repository.deleteById(id);
    }
}
