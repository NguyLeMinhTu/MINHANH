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
import org.springframework.transaction.annotation.Transactional;
import com.minhanh.backend.dto.SanPhamRequestDto;
import com.minhanh.backend.entity.HinhAnhSanPham;
import com.minhanh.backend.entity.BienTheSanPham;
import com.minhanh.backend.dto.BienTheSanPhamDto;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

import java.util.List;
import java.util.regex.Pattern;



@Service
@RequiredArgsConstructor
public class SanPhamService {
    private static final String PUBLISHED = "cong_khai";
    private static final Pattern UUID_PATTERN = Pattern.compile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$");

    private final SanPhamRepository sanPhamRepository;
    private final DanhMucSanPhamRepository danhMucSanPhamRepository;
    private final FileUploadService fileUploadService;

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
     * Lấy danh sách sản phẩm cho Admin (không lọc trường hợp ẩn/hết hàng)
     */
    public Page<SanPham> getAdminPageSanPhams(int page, int size, String search, String danhMucId, String thuongHieu) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "ngayTao"));
        
        Specification<SanPham> spec = (root, query, cb) -> cb.conjunction();
        if (search != null && !search.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("tenSanPham")), "%" + search.trim().toLowerCase() + "%"));
        }
        if (danhMucId != null && !danhMucId.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("danhMuc").get("danhMucId"), danhMucId.trim()));
        }
        if (thuongHieu != null && !thuongHieu.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("thuongHieu")), "%" + thuongHieu.trim().toLowerCase() + "%"));
        }
        
        return sanPhamRepository.findAll(spec, pageable);
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

    // Hàm sinh đường dẫn web (Slug) dùng làm mỏ neo SEO từ Tên Sản Phẩm nguyên thể tiếng Việt
    private String generateSlug(String input) {
        // Nếu tên bị rỗng, cấp mã ngẫu nhiên bằng thời gian máy chủ
        if (input == null || input.trim().isEmpty()) return "sp-" + System.currentTimeMillis();
        
        // Khử dấu câu: "Áo Quần" -> "Ao Quan" -> "ao-quan"
        String slug = java.text.Normalizer.normalize(input, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .trim()
                .replaceAll("\\s+", "-");
                
        // Ép thêm chuỗi số ở đuôi để chống đụng độ 100% (Unique guarantee) mà không cần query MySQL dò tìm
        return slug + "-" + System.currentTimeMillis(); 
    }

    @Transactional
    public SanPham createSanPham(SanPhamRequestDto dto) {
        SanPham sp = new SanPham(); // Tạo vùng nhớ trống trong RAM chuẩn bị nặn hình Sản Phẩm
        
        sp.setTenSanPham(dto.getTenSanPham());
        
        // Về Slug: Bắt buộc phải có, nếu User điền tay thì lấy, nếu lười để trống thì Máy tự sinh
        if (dto.getSlug() != null && !dto.getSlug().trim().isEmpty()) {
            sp.setSlug(dto.getSlug().trim());
        } else {
            sp.setSlug(generateSlug(dto.getTenSanPham()));
        }

        // Đắp các trường thông tin chữ nghĩa thô...
        sp.setMetaTitle(dto.getMetaTitle());
        sp.setMetaDescription(dto.getMetaDescription());
        sp.setGiaThamKhao(dto.getGiaThamKhao() != null ? dto.getGiaThamKhao() : java.math.BigDecimal.ZERO);
        sp.setGiaBan(dto.getGiaBan() != null ? dto.getGiaBan() : java.math.BigDecimal.ZERO);
        sp.setGiaKhuyenMai(dto.getGiaKhuyenMai() != null ? dto.getGiaKhuyenMai() : java.math.BigDecimal.ZERO);
        sp.setSoLuongTon(dto.getSoLuongTon() != null ? dto.getSoLuongTon() : 0);
        sp.setDonViTinh(dto.getDonViTinh() != null ? dto.getDonViTinh() : "Cái");
        sp.setThuongHieu(dto.getThuongHieu());
        sp.setXuatXu(dto.getXuatXu());
        sp.setChatLieu(dto.getChatLieu());
        sp.setBaoQuan(dto.getBaoQuan());
        sp.setTags(dto.getTags());
        sp.setSpNoiBat(dto.getSpNoiBat() != null ? dto.getSpNoiBat() : false);
        sp.setSpMoi(dto.getSpMoi() != null ? dto.getSpMoi() : false);
        sp.setTrangThai(dto.getTrangThai() != null ? dto.getTrangThai() : "cong_khai");
        sp.setNgayTao(java.time.LocalDateTime.now()); // Tem ghi ngày tháng khởi tạo vĩnh viễn (Read-only)
        sp.setViews(0);
        sp.setLuotMua(0);

        // Nối Khóa Ngoại (Foreign Key) móc về Table Danh Mục nếu User có phân loại
        if (dto.getDanhMucId() != null && !dto.getDanhMucId().trim().isEmpty()) {
            DanhMucSanPham dm = danhMucSanPhamRepository.findById(dto.getDanhMucId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục: " + dto.getDanhMucId()));
            sp.setDanhMuc(dm);
        }

        // --- Bắt đầu nặn dòng chảy Biến Thể (Size/Màu) ---
        sp.setBienThe(new ArrayList<>());
        if (dto.getBienThe() != null && !dto.getBienThe().isEmpty()) {
            int totalStock = 0;
            java.util.Set<String> uniqueKeys = new java.util.HashSet<>();

            for (BienTheSanPhamDto bDto : dto.getBienThe()) {
                String c = bDto.getMauSac() != null ? bDto.getMauSac().trim().toLowerCase() : "";
                String s = bDto.getSize() != null ? bDto.getSize().trim().toLowerCase() : "";
                String colorSizeKey = c + "-" + s;
                                    
                if (!uniqueKeys.add(colorSizeKey)) {
                    throw new RuntimeException("Lỗi trùng lặp: Phân loại hàng (Màu: " + bDto.getMauSac() + ", Size: " + bDto.getSize() + ") xuất hiện nhiều lần!");
                }

                BienTheSanPham bt = new BienTheSanPham();
                bt.setSanPham(sp); // Chìa khóa vàng: Đính thằng Con vào thằng Cha
                bt.setMauSac(bDto.getMauSac());
                bt.setSize(bDto.getSize());
                bt.setGia(bDto.getGia());
                bt.setSoLuong(bDto.getSoLuong() != null ? bDto.getSoLuong() : 0);
                
                totalStock += bt.getSoLuong();
                sp.getBienThe().add(bt);
            }
            // Auto-Sync đồng loạt ép số lượng của Cha = Tổng Các Con
            sp.setSoLuongTon(totalStock);
        }

        // --- Bắt đầu nặn list Ảnh Cloudinary ---
        sp.setHinhAnh(new ArrayList<>());
        if (dto.getHinhAnh() != null && !dto.getHinhAnh().isEmpty()) {
            for (String url : dto.getHinhAnh()) {
                HinhAnhSanPham img = new HinhAnhSanPham();
                img.setSanPham(sp); // Đính hình Con vào thân Cha
                img.setUrlAnh(url);
                sp.getHinhAnh().add(img);
            }
        }

        // Kỹ thuật nhét vào Database bằng Hibernate: Mình lưu Thằng Cha thì nó tự động thả luôn 2 bầy đàn Thằng Con xuống SQL thông qua Cascade=ALL 
        return sanPhamRepository.save(sp);
    }

    @Transactional
    public SanPham updateSanPham(String id, SanPhamRequestDto dto) {
        SanPham sp = sanPhamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm: " + id));

        if (dto.getTenSanPham() != null) sp.setTenSanPham(dto.getTenSanPham());
        if (dto.getSlug() != null) sp.setSlug(dto.getSlug());
        if (dto.getMoTa() != null) sp.setMoTa(dto.getMoTa());
        if (dto.getMetaTitle() != null) sp.setMetaTitle(dto.getMetaTitle());
        if (dto.getMetaDescription() != null) sp.setMetaDescription(dto.getMetaDescription());
        if (dto.getGiaThamKhao() != null) sp.setGiaThamKhao(dto.getGiaThamKhao());
        if (dto.getGiaBan() != null) sp.setGiaBan(dto.getGiaBan());
        if (dto.getGiaKhuyenMai() != null) sp.setGiaKhuyenMai(dto.getGiaKhuyenMai());
        if (dto.getSoLuongTon() != null) sp.setSoLuongTon(dto.getSoLuongTon());
        if (dto.getDonViTinh() != null) sp.setDonViTinh(dto.getDonViTinh());
        if (dto.getThuongHieu() != null) sp.setThuongHieu(dto.getThuongHieu());
        if (dto.getXuatXu() != null) sp.setXuatXu(dto.getXuatXu());
        if (dto.getChatLieu() != null) sp.setChatLieu(dto.getChatLieu());
        if (dto.getBaoQuan() != null) sp.setBaoQuan(dto.getBaoQuan());
        if (dto.getTags() != null) sp.setTags(dto.getTags());
        if (dto.getSpNoiBat() != null) sp.setSpNoiBat(dto.getSpNoiBat());
        if (dto.getSpMoi() != null) sp.setSpMoi(dto.getSpMoi());
        if (dto.getTrangThai() != null) sp.setTrangThai(dto.getTrangThai());

        if (dto.getDanhMucId() != null) {
            DanhMucSanPham dm = danhMucSanPhamRepository.findById(dto.getDanhMucId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục: " + dto.getDanhMucId()));
            sp.setDanhMuc(dm);
        }

        if (dto.getBienThe() != null) {
            if (sp.getBienThe() == null) {
                sp.setBienThe(new ArrayList<>());
            }
            // 1. Tạo bản đồ Map tra cứu nhanh Biến thể cũ để bảo vệ dòng dữ liệu không bị xóa tạo mới liên tục
            Map<String, BienTheSanPham> existingVariantMap = sp.getBienThe().stream()
                    .filter(v -> v.getBienTheId() != null)
                    .collect(Collectors.toMap(BienTheSanPham::getBienTheId, v -> v));

            List<BienTheSanPham> updatedVariants = new ArrayList<>();
            int totalStock = 0; // Biến tạm rổ rỗng để tính dồn số lượng kho
            java.util.Set<String> uniqueKeys = new java.util.HashSet<>();

            // 2. Vòng lặp quét dòng chảy dữ liệu Biến Thể từ giao diện React Form gửi xuống
            for (BienTheSanPhamDto bDto : dto.getBienThe()) {
                String c = bDto.getMauSac() != null ? bDto.getMauSac().trim().toLowerCase() : "";
                String s = bDto.getSize() != null ? bDto.getSize().trim().toLowerCase() : "";
                String colorSizeKey = c + "-" + s;
                                    
                if (!uniqueKeys.add(colorSizeKey)) {
                    throw new RuntimeException("Lỗi trùng lặp: Phân loại hàng (Màu: " + bDto.getMauSac() + ", Size: " + bDto.getSize() + ") xuất hiện nhiều lần!");
                }

                BienTheSanPham bt;
                // Nếu React đưa ID cũ quen -> bốc data cũ ra để ghi số liệu mới vào
                if (bDto.getBienTheId() != null && existingVariantMap.containsKey(bDto.getBienTheId())) {
                    bt = existingVariantMap.get(bDto.getBienTheId());
                } else {
                    // Nếu là Size/Màu mới toanh do User tự gõ thêm -> Tạo cờ trắng hoàn toàn mới
                    bt = new BienTheSanPham();
                    bt.setSanPham(sp); // Phải móc nối nó vào Sản Phẩm Gốc
                }
                
                // Set số liệu mới
                bt.setMauSac(bDto.getMauSac());
                bt.setSize(bDto.getSize());
                bt.setGia(bDto.getGia());
                bt.setSoLuong(bDto.getSoLuong() != null ? bDto.getSoLuong() : 0);
                
                // Toán học: Góp gió thành bão - cộng dồn từ từ lượng hàng
                totalStock += bt.getSoLuong();
                updatedVariants.add(bt);
            }
            
            // 3. Quét sạch tàn dư: clear list biến thể cũ (những record bị click dấu Thùng Rác trên React)
            sp.getBienThe().clear();
            // Up mảng mới được dọn dẹp sạch sẽ vào entity
            sp.getBienThe().addAll(updatedVariants);
            
            // 4. LUẬT BẤT THÀNH VĂN AUTO-SYNC: 
            // Nếu có ít nhất 1 biến thể, Cấm ghi đè bậy, lấy Tổng Kho Con đè lấp lên Kho Mẹ.
            if (!updatedVariants.isEmpty()) {
                sp.setSoLuongTon(totalStock);
            }
        }

        if (dto.getHinhAnh() != null) {
            if (sp.getHinhAnh() != null) {
                // Tìm ảnh đã bị xóa (có trong DB nhưng không có trong danh sách mới gửi lên)
                List<String> newUrls = dto.getHinhAnh();
                sp.getHinhAnh().stream()
                        .map(HinhAnhSanPham::getUrlAnh)
                        .filter(url -> !newUrls.contains(url))
                        .forEach(fileUploadService::deleteFile); // ← Xóa ảnh thừa khỏi Cloudinary
                sp.getHinhAnh().clear(); // Sẽ kích hoạt orphanRemoval trong DB
            } else {
                sp.setHinhAnh(new ArrayList<>());
            }
            for (String url : dto.getHinhAnh()) {
                HinhAnhSanPham ha = new HinhAnhSanPham();
                ha.setUrlAnh(url);
                ha.setSanPham(sp);
                sp.getHinhAnh().add(ha);
            }
        }

        return sanPhamRepository.save(sp);
    }

    @Transactional
    public void softDeleteSanPham(String id) {
        SanPham sp = sanPhamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm: " + id));
        // Xóa toàn bộ ảnh của sản phẩm khỏi Cloudinary trước khi ẩn
        if (sp.getHinhAnh() != null) {
            sp.getHinhAnh().forEach(img -> fileUploadService.deleteFile(img.getUrlAnh()));
        }
        sp.setTrangThai("an");
        sanPhamRepository.save(sp);
    }

        /**
         * Lấy dữ liệu trang sản phẩm gồm danh mục, danh sách sản phẩm và metadata phân trang.
         */
    public ProductPageResponse getProductPage(
            int page,
            int size,
            String q,
            String categorySlug,
            String subCategorySlug,
            Boolean isNew,
            Boolean isFeatured,
            java.math.BigDecimal minPrice,
            java.math.BigDecimal maxPrice,
            String brand,
            String material,
            String origin,
            String sort
    ) {
        Sort sortValue = buildSort(sort);
        Pageable pageable = PageRequest.of(page, size, sortValue);
        Specification<SanPham> spec = buildPublicProductSpec(q, categorySlug, subCategorySlug, isNew, isFeatured, minPrice, maxPrice, brand, material, origin);

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
     * Hỗ trợ lọc theo Slug của Danh mục cha và Danh mục con.
     */
    private Specification<SanPham> buildPublicProductSpec(
            String q,
            String categorySlug,
            String subCategorySlug,
            Boolean spMoi,
            Boolean spNoiBat,
            java.math.BigDecimal minPrice,
            java.math.BigDecimal maxPrice,
            String brand,
            String material,
            String origin
    ) {
        Specification<SanPham> spec = (root, query, cb) -> cb.equal(root.get("trangThai"), PUBLISHED);

        // Lọc theo từ khóa
        if (q != null && !q.trim().isEmpty()) {
            String qLower = "%" + q.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("tenSanPham")), qLower));
        }

        // Lọc theo Danh mục Con (Nghiêm ngặt hơn)
        if (subCategorySlug != null && !subCategorySlug.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("danhMuc").get("slug"), subCategorySlug.trim()));
        } 
        // Lọc theo Danh mục Cha (Bao gồm tất cả con của nó)
        else if (categorySlug != null && !categorySlug.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> {
                // Ta cần tìm ID của cha trước, rồi tìm tất cả con + chính nó
                // Hoặc dùng JOIN linh hoạt:
                jakarta.persistence.criteria.Join<Object, Object> dmJoin = root.join("danhMuc");
                return cb.or(
                    cb.equal(dmJoin.get("slug"), categorySlug.trim()), // Chính nó (nêu là cha mà có sp)
                    cb.equal(dmJoin.join("parent", jakarta.persistence.criteria.JoinType.LEFT).get("slug"), categorySlug.trim()) // Các con của nó
                );
            });
        }

        // Lọc sp mới
        if (spMoi != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("spMoi"), spMoi));
        }

        // Lọc sp nổi bật
        if (spNoiBat != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("spNoiBat"), spNoiBat));
        }

        // Lọc theo giá
        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("giaBan"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("giaBan"), maxPrice));
        }

        // Lọc theo thương hiệu
        if (brand != null && !brand.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("thuongHieu"), brand.trim()));
        }

        // Lọc theo chất liệu
        if (material != null && !material.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("chatLieu"), material.trim()));
        }

        // Lọc theo xuất xứ
        if (origin != null && !origin.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("xuatXu"), origin.trim()));
        }

        return spec;
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
        List<String> images = sp.getHinhAnh() != null 
                ? sp.getHinhAnh().stream().map(HinhAnhSanPham::getUrlAnh).toList() 
                : List.of();
        
        String anhDaiDien = images.isEmpty() ? null : images.get(0);

        return new ProductCardDto(
                sp.getSanPhamId(),
                sp.getTenSanPham(),
                sp.getSlug(),
                sp.getGiaBan(),
                sp.getGiaKhuyenMai(),
                anhDaiDien,
                images,
                sp.getDanhMuc() != null ? sp.getDanhMuc().getDanhMucId() : null,
                sp.getDanhMuc() != null ? sp.getDanhMuc().getTenDanhMuc() : null,
                sp.getThuongHieu(),
                sp.getChatLieu(),
                sp.getXuatXu(),
                sp.getSpMoi(),
                sp.getSpNoiBat()
        );
    }
}


