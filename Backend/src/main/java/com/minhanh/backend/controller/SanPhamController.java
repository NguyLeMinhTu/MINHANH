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
     * 
     * @param pageNumber số trang (mặc định: 0)
     * @param pageSize số lượng sản phẩm mỗi trang (mặc định: 12)
     * @param searchQuery từ khóa tìm kiếm
     * @param categoryId ID danh mục sản phẩm
     * @param isNewProduct lọc sản phẩm mới
     * @param isFeaturedProduct lọc sản phẩm nổi bật
     * @return danh sách sản phẩm public với phân trang
     */
    @GetMapping
    public Page<SanPham> getPublicProducts(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "12") int pageSize,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) Boolean isNewProduct,
            @RequestParam(required = false) Boolean isFeaturedProduct
    ) {
        return sanPhamService.getPublicProducts(pageNumber, pageSize, searchQuery, categoryId, isNewProduct, isFeaturedProduct);
    }

    /**
     * API lấy chi tiết sản phẩm bằng slug hoặc UUID.
     */
    @GetMapping("/{slugOrId}")
    public SanPham getBySlug(@PathVariable String slugOrId) {
        return sanPhamService.getBySlugOrId(slugOrId);
    }

    /**
     * API lấy dữ liệu cho trang sản phẩm, hỗ trợ phân trang và các bộ lọc.
     * 
     * @param pageNumber số trang (mặc định: 0)
     * @param pageSize số lượng sản phẩm mỗi trang (mặc định: 12)
     * @param searchQuery từ khóa tìm kiếm
     * @param categoryId ID danh mục sản phẩm
     * @param isNewProduct lọc sản phẩm mới
     * @param isFeaturedProduct lọc sản phẩm nổi bật
     * @param sortBy cách sắp xếp kết quả (mặc định: newest)
     * @return trang sản phẩm với các bộ lọc đã áp dụng
     */
    @GetMapping("/page")
    public ProductPageResponse getProductPage(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "12") int pageSize,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) Boolean isNewProduct,
            @RequestParam(required = false) Boolean isFeaturedProduct,
            @RequestParam(defaultValue = "newest") String sortBy
    ) {
        return sanPhamService.getProductPage(
                pageNumber,
                pageSize,
                searchQuery,
                categoryId,
                isNewProduct,
                isFeaturedProduct,
                sortBy
        );
    }

    /**
     * API lấy danh sách sản phẩm với phân trang và các bộ lọc.
     * 
     * @param pageNumber số trang (mặc định: 0)
     * @param pageSize số lượng sản phẩm mỗi trang (mặc định: 12)
     * @param searchQuery từ khóa tìm kiếm
     * @param categoryId ID danh mục sản phẩm
     * @param isNewProduct lọc sản phẩm mới
     * @param isFeaturedProduct lọc sản phẩm nổi bật
     * @param sortBy cách sắp xếp kết quả (mặc định: newest)
     * @return trang sản phẩm với các bộ lọc đã áp dụng
     */
    @GetMapping("/list")
    public ProductPageResponse getProductList(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "12") int pageSize,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) Boolean isNewProduct,
            @RequestParam(required = false) Boolean isFeaturedProduct,
            @RequestParam(defaultValue = "newest") String sortBy
    ) {
        return sanPhamService.getProductPage(
                pageNumber,
                pageSize,
                searchQuery,
                categoryId,
                isNewProduct,
                isFeaturedProduct,
                sortBy
        );
    }
}
