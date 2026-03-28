package com.minhanh.backend.service;

import com.minhanh.backend.dto.SlideDto;
import com.minhanh.backend.dto.SlideRequest;
import com.minhanh.backend.entity.Slide;
import com.minhanh.backend.repository.SlideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SlideService {

    private final SlideRepository slideRepository;
    private final FileUploadService fileUploadService;

    // ===== Chuyển entity → DTO =====
    private SlideDto toDto(Slide s) {
        return new SlideDto(s.getSlideId(), s.getTieuDe(), s.getMoTa(), s.getUrlHinh(), s.getLink(), s.getThuTu(), s.getTrangThai());
    }

    // ===== Admin: lấy tất cả =====
    public List<SlideDto> getAll() {
        return slideRepository.findAll(org.springframework.data.domain.Sort.by("thuTu")).stream().map(this::toDto).toList();
    }

    // ===== Public: chỉ lấy active =====
    public List<SlideDto> getPublic() {
        return slideRepository.findByTrangThaiTrueOrderByThuTuAsc().stream().map(this::toDto).toList();
    }

    // ===== Tạo mới =====
    public SlideDto create(SlideRequest req) {
        // Tính thuTu tự động nếu không truyền
        int thuTu = req.getThuTu() != null ? req.getThuTu()
                : (int) slideRepository.count() + 1;

        Slide slide = Slide.builder()
                .tieuDe(req.getTieuDe())
                .moTa(req.getMoTa())
                .urlHinh(req.getUrlHinh())
                .link(req.getLink())
                .thuTu(thuTu)
                .trangThai(req.getTrangThai() != null ? req.getTrangThai() : true)
                .build();
        return toDto(slideRepository.save(slide));
    }

    // ===== Cập nhật =====
    public SlideDto update(String id, SlideRequest req) {
        Slide slide = slideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy slide: " + id));

        // Nếu đổi ảnh thì xóa ảnh cũ
        if (req.getUrlHinh() != null && !req.getUrlHinh().equals(slide.getUrlHinh())) {
            if (slide.getUrlHinh() != null) fileUploadService.deleteFile(slide.getUrlHinh());
            slide.setUrlHinh(req.getUrlHinh());
        }
        if (req.getTieuDe() != null) slide.setTieuDe(req.getTieuDe());
        if (req.getMoTa() != null) slide.setMoTa(req.getMoTa());
        if (req.getLink() != null) slide.setLink(req.getLink());
        if (req.getThuTu() != null) slide.setThuTu(req.getThuTu());
        if (req.getTrangThai() != null) slide.setTrangThai(req.getTrangThai());

        return toDto(slideRepository.save(slide));
    }

    // ===== Toggle trạng thái =====
    public SlideDto toggle(String id) {
        Slide slide = slideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy slide: " + id));
        slide.setTrangThai(!Boolean.TRUE.equals(slide.getTrangThai()));
        return toDto(slideRepository.save(slide));
    }

    // ===== Xóa =====
    public void delete(String id) {
        Slide slide = slideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy slide: " + id));
        if (slide.getUrlHinh() != null) fileUploadService.deleteFile(slide.getUrlHinh());
        slideRepository.delete(slide);
    }

    // ===== Sắp xếp lại thứ tự =====
    public void reorder(List<String> ids) {
        for (int i = 0; i < ids.size(); i++) {
            final int order = i + 1;
            slideRepository.findById(ids.get(i)).ifPresent(s -> {
                s.setThuTu(order);
                slideRepository.save(s);
            });
        }
    }
}
