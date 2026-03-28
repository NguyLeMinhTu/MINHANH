package com.minhanh.backend.controller;

import com.minhanh.backend.dto.BaiVietResponseDto;
import com.minhanh.backend.service.BaiVietService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bai-viet")
@RequiredArgsConstructor
public class PublicBaiVietController {

    private final BaiVietService baiVietService;

    /**
     * GET /api/bai-viet?page=0&size=10&dm=slug
     * Lấy danh sách bài viết đã PUBLISHED, có thể lọc theo slug danh mục
     */
    @GetMapping
    public ResponseEntity<Page<BaiVietResponseDto>> getPublic(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String dm
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(baiVietService.getPublic(pageable, dm));
    }

    /**
     * GET /api/bai-viet/{slug}
     * Lấy chi tiết bài viết theo slug (chỉ PUBLISHED)
     */
    @GetMapping("/{slug}")
    public ResponseEntity<BaiVietResponseDto> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(baiVietService.getBySlugDto(slug));
    }

    /**
     * GET /api/bai-viet/{slug}/related?size=4
     * Lấy bài viết liên quan cùng danh mục, loại trừ bài hiện tại
     */
    @GetMapping("/{slug}/related")
    public ResponseEntity<java.util.List<BaiVietResponseDto>> getRelated(
            @PathVariable String slug,
            @RequestParam(defaultValue = "4") int size) {
        return ResponseEntity.ok(baiVietService.getRelated(slug, size));
    }
}
