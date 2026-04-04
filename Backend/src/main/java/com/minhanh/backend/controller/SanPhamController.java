package com.minhanh.backend.controller;

import com.minhanh.backend.dto.ProductPageResponse;
import com.minhanh.backend.entity.SanPham;
import com.minhanh.backend.service.SanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/san-pham")
@RequiredArgsConstructor
public class SanPhamController {
    private final SanPhamService sanPhamService;

    /**
     * API lấy dữ liệu đầy đủ cho trang sản phẩm, hỗ trợ phân trang, lọc, sắp xếp.
     * Phù hợp cho trang catalog đầy đủ với metadata và thống kê.
     * 
     * @param page số trang (mặc định: 0)
     * @param size số lượng sản phẩm mỗi trang (mặc định: 12)
     * @param keyword từ khóa tìm kiếm
     * @param categoryId ID danh mục sản phẩm
     * @param isNew lọc sản phẩm mới
     * @param isFeatured lọc sản phẩm nổi bật
     * @param sort cách sắp xếp kết quả (mặc định: newest)
     * @return trang sản phẩm với metadata đầy đủ
     */
    @GetMapping
    public ResponseEntity<ProductPageResponse> listProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String categorySlug,
            @RequestParam(required = false) String subCategorySlug,
            @RequestParam(required = false) Boolean isNew,
            @RequestParam(required = false) Boolean isFeatured,
            @RequestParam(required = false) java.math.BigDecimal minPrice,
            @RequestParam(required = false) java.math.BigDecimal maxPrice,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String material,
            @RequestParam(required = false) String origin,
            @RequestParam(defaultValue = "newest") String sort
    ) {
        return ResponseEntity.ok(sanPhamService.getProductPage(
                page, size, keyword, categorySlug, subCategorySlug, isNew, isFeatured, minPrice, maxPrice, brand, material, origin, sort
        ));
    }

    /**
     * API lấy chi tiết sản phẩm bằng slug hoặc UUID.
     * 
     * @param slugOrId slug hoặc UUID sản phẩm
     * @return chi tiết sản phẩm
     */
    @GetMapping("/{slugOrId}")
    public ResponseEntity<SanPham> getProductDetail(
            @PathVariable String slugOrId
    ) {
        SanPham product = sanPhamService.getBySlugOrId(slugOrId);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    /**
     * API tăng lượt xem sản phẩm. 
     * 
     * @param id ID sản phẩm
     * @return 200 OK
     */
    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementView(@PathVariable String id) {
        sanPhamService.incrementViewCount(id);
        return ResponseEntity.ok().build();
    }
}
