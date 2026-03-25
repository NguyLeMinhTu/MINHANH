package com.minhanh.backend.service;

import com.minhanh.backend.dto.DanhMucBaiVietRequestDto;
import com.minhanh.backend.entity.DanhMucBaiViet;
import com.minhanh.backend.repository.DanhMucBaiVietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class DanhMucBaiVietService {

    @Autowired
    private DanhMucBaiVietRepository repository;

    public List<DanhMucBaiViet> getAll() {
        return repository.findAll();
    }

    public DanhMucBaiViet getById(String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục bài viết"));
    }

    public DanhMucBaiViet create(DanhMucBaiVietRequestDto req) {
        DanhMucBaiViet danhMuc = new DanhMucBaiViet();
        danhMuc.setTenDanhMuc(req.getTenDanhMuc());
        danhMuc.setMoTa(req.getMoTa());
        danhMuc.setTrangThai(req.getTrangThai() != null ? req.getTrangThai() : true);
        
        if (req.getSlug() == null || req.getSlug().trim().isEmpty()) {
            danhMuc.setSlug(generateSlug(req.getTenDanhMuc()));
        } else {
            danhMuc.setSlug(req.getSlug().trim());
        }

        if (repository.existsBySlug(danhMuc.getSlug())) {
            throw new RuntimeException("Lỗi: Đường dẫn (Slug) đã tồn tại: " + danhMuc.getSlug());
        }

        return repository.save(danhMuc);
    }

    @Transactional
    public DanhMucBaiViet update(String id, DanhMucBaiVietRequestDto req) {
        DanhMucBaiViet existing = getById(id);
        existing.setTenDanhMuc(req.getTenDanhMuc());
        existing.setMoTa(req.getMoTa());
        if (req.getTrangThai() != null) {
            existing.setTrangThai(req.getTrangThai());
        }
        
        String newSlug = (req.getSlug() == null || req.getSlug().trim().isEmpty()) 
                ? generateSlug(req.getTenDanhMuc()) 
                : req.getSlug().trim();
                
        if (!newSlug.equals(existing.getSlug()) && repository.existsBySlug(newSlug)) {
            throw new RuntimeException("Lỗi: Đường dẫn (Slug) đã tồn tại: " + newSlug);
        }
        existing.setSlug(newSlug);

        return repository.save(existing);
    }

    @Transactional
    public void delete(String id) {
        // Thực hiện Xóa mềm: Chuyển trạng thái sang FALSE
        DanhMucBaiViet existing = getById(id);
        existing.setTrangThai(false);
        repository.save(existing);
    }

    private String generateSlug(String input) {
        if (input == null || input.trim().isEmpty()) return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized).replaceAll("");
        slug = slug.toLowerCase().replaceAll("đ", "d");
        slug = slug.replaceAll("[^a-z0-9\\-]", "-");
        slug = slug.replaceAll("-+", "-");
        slug = slug.replaceAll("^-+|-+$", "");
        return slug;
    }
}
