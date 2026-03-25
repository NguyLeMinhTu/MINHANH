package com.minhanh.backend.service;

import com.minhanh.backend.dto.BaiVietRequestDto;
import com.minhanh.backend.dto.BaiVietResponseDto;
import com.minhanh.backend.entity.BaiViet;
import com.minhanh.backend.entity.DanhMucBaiViet;
import com.minhanh.backend.entity.HinhAnhBaiViet;
import com.minhanh.backend.repository.BaiVietRepository;
import com.minhanh.backend.repository.DanhMucBaiVietRepository;
import com.minhanh.backend.repository.HinhAnhBaiVietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class BaiVietService {

    @Autowired
    private BaiVietRepository repository;

    @Autowired
    private DanhMucBaiVietRepository danhMucRepository;

    @Autowired
    private HinhAnhBaiVietRepository hinhAnhRepository;

    public Page<BaiVietResponseDto> getAll(Pageable pageable) {
        return repository.findAllOrderByNgayDangDesc(pageable).map(this::toDto);
    }

    public BaiViet getById(String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết với ID: " + id));
    }

    public BaiVietResponseDto getByIdDto(String id) {
        return toDto(getById(id));
    }

    public BaiVietResponseDto getBySlugDto(String slug) {
        BaiViet bv = repository.findBySlug(slug).orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết với Slug: " + slug));
        return toDto(bv);
    }

    @Transactional
    public BaiViet create(BaiVietRequestDto req) {
        BaiViet bv = new BaiViet();
        bv.setTieuDe(req.getTieuDe());
        bv.setNoiDung(req.getNoiDung());
        bv.setTomTat(req.getTomTat());
        bv.setAnhDaiDien(req.getAnhDaiDien());
        bv.setTrangThai(req.getTrangThai() != null ? req.getTrangThai() : "PUBLISHED");
        bv.setTags(req.getTags());
        bv.setViews(0);
        bv.setNgayDang(LocalDateTime.now());

        // Slug
        if (req.getSlug() == null || req.getSlug().trim().isEmpty()) {
            bv.setSlug(generateSlug(req.getTieuDe()));
        } else {
            bv.setSlug(req.getSlug().trim());
        }

        if (repository.existsBySlug(bv.getSlug())) {
            bv.setSlug(bv.getSlug() + "-" + System.currentTimeMillis() % 1000);
        }

        // Danh mục
        if (req.getDanhMucId() != null && !req.getDanhMucId().isEmpty()) {
            DanhMucBaiViet dm = danhMucRepository.findById(req.getDanhMucId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục bài viết"));
            bv.setDanhMuc(dm);
        }

        BaiViet saved = repository.save(bv);
        syncImagesFromContent(saved);
        return saved;
    }

    @Transactional
    public BaiViet update(String id, BaiVietRequestDto req) {
        BaiViet bv = getById(id);
        bv.setTieuDe(req.getTieuDe());
        bv.setNoiDung(req.getNoiDung());
        bv.setTomTat(req.getTomTat());
        bv.setAnhDaiDien(req.getAnhDaiDien());
        bv.setTrangThai(req.getTrangThai());
        bv.setTags(req.getTags());

        String newSlug = (req.getSlug() == null || req.getSlug().trim().isEmpty()) 
                ? generateSlug(req.getTieuDe()) 
                : req.getSlug().trim();

        if (!newSlug.equals(bv.getSlug()) && repository.existsBySlug(newSlug)) {
             newSlug = newSlug + "-" + System.currentTimeMillis() % 1000;
        }
        bv.setSlug(newSlug);

        // Danh mục
        if (req.getDanhMucId() != null && !req.getDanhMucId().isEmpty()) {
            DanhMucBaiViet dm = danhMucRepository.findById(req.getDanhMucId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục bài viết"));
            bv.setDanhMuc(dm);
        } else {
            bv.setDanhMuc(null);
        }

        BaiViet updated = repository.save(bv);
        syncImagesFromContent(updated);
        return updated;
    }

    private void syncImagesFromContent(BaiViet bv) {
        // Xóa sạch ảnh cũ của bài viết này
        hinhAnhRepository.deleteByBaiViet(bv);

        if (bv.getNoiDung() == null || bv.getNoiDung().isEmpty()) return;

        // Regex tìm tất cả URL ảnh trong thẻ <img src="...">
        Pattern pattern = Pattern.compile("<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>");
        java.util.regex.Matcher matcher = pattern.matcher(bv.getNoiDung());

        while (matcher.find()) {
            String imageUrl = matcher.group(1);
            if (imageUrl != null && !imageUrl.isEmpty()) {
                com.minhanh.backend.entity.HinhAnhBaiViet hinhAnh = com.minhanh.backend.entity.HinhAnhBaiViet.builder()
                        .baiViet(bv)
                        .urlAnh(imageUrl)
                        .build();
                hinhAnhRepository.save(hinhAnh);
            }
        }
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    private BaiVietResponseDto toDto(BaiViet bv) {
        if (bv == null) return null;
        
        BaiVietResponseDto.DanhMucDto dmDto = null;
        if (bv.getDanhMuc() != null) {
            dmDto = BaiVietResponseDto.DanhMucDto.builder()
                    .danhMucBaiVietId(bv.getDanhMuc().getDanhMucBaiVietId())
                    .tenDanhMuc(bv.getDanhMuc().getTenDanhMuc())
                    .slug(bv.getDanhMuc().getSlug())
                    .build();
        }

        List<String> imageUrls = (bv.getHinhAnh() != null)
                ? bv.getHinhAnh().stream().map(HinhAnhBaiViet::getUrlAnh).toList()
                : List.of();

        return BaiVietResponseDto.builder()
                .baiVietId(bv.getBaiVietId())
                .tieuDe(bv.getTieuDe())
                .slug(bv.getSlug())
                .noiDung(bv.getNoiDung())
                .tomTat(bv.getTomTat())
                .anhDaiDien(bv.getAnhDaiDien())
                .views(bv.getViews())
                .tags(bv.getTags())
                .trangThai(bv.getTrangThai())
                .ngayDang(bv.getNgayDang())
                .danhMuc(dmDto)
                .hinhAnh(imageUrls)
                .build();
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
