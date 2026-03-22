package com.minhanh.backend.service;
import com.minhanh.backend.dto.CategoryDto;
import com.minhanh.backend.dto.ProductCardDto;
import com.minhanh.backend.dto.ProductPageResponse;
import com.minhanh.backend.entity.DanhMucSanPham;
import com.minhanh.backend.entity.SanPham;
import com.minhanh.backend.exception.ResourceNotFoundException;
import com.minhanh.backend.repository.DanhMucSanPhamRepository;
import com.minhanh.backend.repository.SanPhamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class SanPhamService {
    private static final String PUBLISHED = "PUBLISHED";
    private static final Pattern UUID_PATTERN = Pattern.compile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$");

    private final SanPhamRepository sanPhamRepository;
    private final DanhMucSanPhamRepository danhMucSanPhamRepository;

    /**
     * Lấy danh sách sản phẩm public có phân trang.
     * Ưu tiên lọc theo thứ tự: q -> danhMucId -> spMoi -> spNoiBat.
     */
    public Page<SanPham> getPublicProducts(
            int page,
            int size,
            String q,
            String danhMucId,
            Boolean spMoi,
            Boolean spNoiBat
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "ngayTao"));
        String trangThai = PUBLISHED;

        // Nếu có từ khóa tìm kiếm thì lọc theo tên sản phẩm.
        if (q != null && !q.trim().isEmpty()) {
            return sanPhamRepository.findByTrangThaiAndTenSanPhamContainingIgnoreCase(
                    trangThai, q.trim(), pageable
            );
        }

        // Nếu có danh mục thì lọc theo danh mục.
        if (danhMucId != null && !danhMucId.trim().isEmpty()) {
            return sanPhamRepository.findByTrangThaiAndDanhMuc_DanhMucId(
                    trangThai, danhMucId.trim(), pageable
            );
        }

        // Nếu có cờ sản phẩm mới thì lọc theo cờ này.
        if (spMoi != null) {
            return sanPhamRepository.findByTrangThaiAndSpMoi(
                    trangThai, spMoi, pageable
            );
        }

        // Nếu có cờ sản phẩm nổi bật thì lọc theo cờ này.
        if (spNoiBat != null) {
            return sanPhamRepository.findByTrangThaiAndSpNoiBat(
                    trangThai, spNoiBat, pageable
            );
        }

        // Mặc định trả toàn bộ sản phẩm public.
        return sanPhamRepository.findByTrangThai(trangThai, pageable);
    }

    /**
        * Lấy chi tiết sản phẩm bằng slug hoặc UUID, chỉ trả sản phẩm đã publish.
     */
    public SanPham getBySlugOrId(String slugOrId) {
        if (slugOrId == null || slugOrId.trim().isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy sản phẩm");
        }

        String value = slugOrId.trim();
        if (UUID_PATTERN.matcher(value).matches()) {
            return sanPhamRepository.findBySanPhamIdAndTrangThai(value, PUBLISHED)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm"));
        }

        return sanPhamRepository.findBySlugAndTrangThai(value, PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm"));
    }

        /**
         * Lấy dữ liệu trang sản phẩm gồm danh mục, danh sách sản phẩm và metadata phân trang.
         */
    public ProductPageResponse getProductPage(
            int page,
            int size,
            String q,
            String danhMucId,
            Boolean spMoi,
            Boolean spNoiBat,
            String sort
    ) {
        Sort sortValue = buildSort(sort);
        Pageable pageable = PageRequest.of(page, size, sortValue);
        Specification<SanPham> spec = buildPublicProductSpec(q, danhMucId, spMoi, spNoiBat);

        Page<SanPham> productPage = sanPhamRepository.findAll(spec, pageable);

        List<CategoryDto> categories = danhMucSanPhamRepository.findByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(this::toCategoryDto)
                .toList();

        List<ProductCardDto> products = productPage.getContent().stream()
                .map(this::toProductCardDto)
                .toList();

        return new ProductPageResponse(
                categories,
                products,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalPages(),
                productPage.getTotalElements()
        );
    }

    /**
     * Tạo specification cho bộ lọc sản phẩm public (q, danh mục, sản phẩm mới, nổi bật).
     */
    private Specification<SanPham> buildPublicProductSpec(
            String q,
            String danhMucId,
            Boolean spMoi,
            Boolean spNoiBat
    ) {
        Specification<SanPham> isPublished =
                (root, query, cb) -> cb.equal(root.get("trangThai"), PUBLISHED);

        Specification<SanPham> byKeyword = (root, query, cb) -> {
            if (q == null || q.trim().isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(cb.lower(root.get("tenSanPham")), "%" + q.trim().toLowerCase() + "%");
        };

        Specification<SanPham> byCategory = (root, query, cb) -> {
            if (danhMucId == null || danhMucId.trim().isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.join("danhMuc").get("danhMucId"), danhMucId.trim());
        };

        Specification<SanPham> byNewFlag =
                (root, query, cb) -> spMoi == null ? cb.conjunction() : cb.equal(root.get("spMoi"), spMoi);

        Specification<SanPham> byFeaturedFlag =
                (root, query, cb) -> spNoiBat == null ? cb.conjunction() : cb.equal(root.get("spNoiBat"), spNoiBat);

        return where(isPublished)
                .and(byKeyword)
                .and(byCategory)
                .and(byNewFlag)
                .and(byFeaturedFlag);
    }

    /**
     * Quy đổi tham số sort từ query string sang cấu hình Sort của Spring Data.
     */
    private Sort buildSort(String sort) {
        if ("price_asc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Direction.ASC, "giaBan");
        }
        if ("price_desc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Direction.DESC, "giaBan");
        }
        if ("name_asc".equalsIgnoreCase(sort)) {
            return Sort.by(Sort.Direction.ASC, "tenSanPham");
        }
        return Sort.by(Sort.Direction.DESC, "ngayTao");
    }

    /**
     * Mapping entity danh mục sang DTO hiển thị trên trang sản phẩm.
     */
    private CategoryDto toCategoryDto(DanhMucSanPham dm) {
        return new CategoryDto(
                dm.getDanhMucId(),
                dm.getTenDanhMuc(),
                dm.getSlug(),
                dm.getHinhAnh()
        );
    }

    /**
     * Mapping entity sản phẩm sang DTO card để frontend render danh sách.
     */
    private ProductCardDto toProductCardDto(SanPham sp) {
        String anhDaiDien = null;
        if (sp.getHinhAnh() != null && !sp.getHinhAnh().isEmpty()) {
            anhDaiDien = sp.getHinhAnh().get(0).getUrlAnh();
        }
        return new ProductCardDto(
                sp.getSanPhamId(),
                sp.getTenSanPham(),
                sp.getSlug(),
                sp.getGiaBan(),
                sp.getGiaKhuyenMai(),
                anhDaiDien,
                sp.getDanhMuc() != null ? sp.getDanhMuc().getDanhMucId() : null,
                sp.getDanhMuc() != null ? sp.getDanhMuc().getTenDanhMuc() : null,
                sp.getSpMoi(),
                sp.getSpNoiBat()
        );
    }
}


