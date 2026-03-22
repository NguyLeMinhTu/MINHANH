package com.minhanh.backend.controller;

import com.minhanh.backend.dto.ProductPageResponse;
import com.minhanh.backend.entity.SanPham;
import com.minhanh.backend.service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/san-pham")
@RequiredArgsConstructor
public class SanPhamController {
    private final SanPhamService sanPhamService;

    /**
     * API lấy danh sách sản phẩm public có phân trang và bộ lọc cơ bản.
     */
    @GetMapping
    public Page<SanPham> getPublicProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String danhMucId,
            @RequestParam(required = false) Boolean spMoi,
            @RequestParam(required = false) Boolean spNoiBat
    ) {
        return sanPhamService.getPublicProducts(page, size, q, danhMucId, spMoi, spNoiBat);
    }

    /**
     * API lấy chi tiết sản phẩm bằng slug hoặc UUID.
     */
    @GetMapping("/{slugOrId}")
    public SanPham getBySlug(@PathVariable String slugOrId) {
        return sanPhamService.getBySlugOrId(slugOrId);
    }

    /**
     * API dữ liệu cho Trang sản phẩm, hỗ trợ cả query đầy đủ và query rút gọn.
     */
    @GetMapping("/trang")
    public ProductPageResponse getProductPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String danhMucId,
            @RequestParam(required = false) Boolean spMoi,
            @RequestParam(required = false) Boolean spNoiBat,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(required = false, name = "p") Integer p,
            @RequestParam(required = false, name = "z") Integer z,
            @RequestParam(required = false, name = "dm") String dm,
            @RequestParam(required = false, name = "s") String s
    ) {
        int resolvedPage = p != null ? p : page;
        int resolvedSize = z != null ? z : size;
        String resolvedDanhMuc = dm != null ? dm : danhMucId;
        String resolvedSort = s != null ? s : sort;

        return sanPhamService.getProductPage(
                resolvedPage,
                resolvedSize,
                q,
                resolvedDanhMuc,
                spMoi,
                spNoiBat,
                resolvedSort
        );
    }

    /**
     * API alias ngắn cho frontend di động hoặc tracking URL ngắn.
     */
    @GetMapping("/g")
    public ProductPageResponse getProductPageShort(
            @RequestParam(defaultValue = "0", name = "p") int page,
            @RequestParam(defaultValue = "12", name = "z") int size,
            @RequestParam(required = false, name = "q") String q,
            @RequestParam(required = false, name = "dm") String danhMucId,
            @RequestParam(required = false, name = "m") Boolean spMoi,
            @RequestParam(required = false, name = "nb") Boolean spNoiBat,
            @RequestParam(defaultValue = "newest", name = "s") String sort
    ) {
        return sanPhamService.getProductPage(page, size, q, danhMucId, spMoi, spNoiBat, sort);
    }
}
