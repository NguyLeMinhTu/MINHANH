package com.minhanh.backend.service;

import com.minhanh.backend.dto.DanhMucMenuDto;
import com.minhanh.backend.entity.DanhMucSanPham;
import com.minhanh.backend.repository.DanhMucSanPhamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DanhMucSanPhamService {

    private final DanhMucSanPhamRepository repository;
    private final com.minhanh.backend.repository.SanPhamRepository sanPhamRepository;

    // Lấy cây danh mục (Cha -> Con) cho Menu
    public List<DanhMucMenuDto> getCategoryTree() {
        List<DanhMucSanPham> all = repository.findAll();
        
        // Lọc danh mục cha (parent == null) và đang hoạt động
        return all.stream()
                .filter(dm -> dm.getParent() == null && Boolean.TRUE.equals(dm.getTrangThai()))
                .sorted(java.util.Comparator.comparingInt(dm -> dm.getThuTu() != null ? dm.getThuTu() : 0))
                .map(this::mapToMenuDto)
                .collect(Collectors.toList());
    }

    private DanhMucMenuDto mapToMenuDto(DanhMucSanPham dm) {
        List<DanhMucMenuDto> children = repository.findByParentOrderByThuTuAsc(dm).stream()
                .filter(child -> Boolean.TRUE.equals(child.getTrangThai()))
                .map(child -> DanhMucMenuDto.builder()
                        .id(child.getDanhMucId())
                        .tenDanhMuc(child.getTenDanhMuc())
                        .slug(child.getSlug())
                        .children(null) // Chỉ hỗ trợ 2 cấp
                        .build())
                .collect(Collectors.toList());

        return DanhMucMenuDto.builder()
                .id(dm.getDanhMucId())
                .tenDanhMuc(dm.getTenDanhMuc())
                .slug(dm.getSlug())
                .children(children)
                .build();
    }

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

    // Engine Sinh URL Slug thân thiện tự động tương tự Sản Phẩm
    private String generateSlug(String input) {
        if (input == null || input.trim().isEmpty()) return "dm-" + System.currentTimeMillis();
        String slug = java.text.Normalizer.normalize(input, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")
                .trim()
                .replaceAll("\\s+", "-");
        return slug + "-" + System.currentTimeMillis(); 
    }

    // Tạo mới
    public DanhMucSanPham create(com.minhanh.backend.dto.DanhMucRequestDto req) {
        DanhMucSanPham danhMuc = new DanhMucSanPham();
        danhMuc.setTenDanhMuc(req.getTenDanhMuc());
        danhMuc.setMoTa(req.getMoTa());
        danhMuc.setHinhAnh(req.getHinhAnh());
        danhMuc.setThuTu(req.getThuTu() != null ? req.getThuTu() : 0);
        danhMuc.setTrangThai(req.getTrangThai() != null ? req.getTrangThai() : true);
        
        // Tự động sinh Slug nếu không được cung cấp
        if (req.getSlug() == null || req.getSlug().trim().isEmpty()) {
            danhMuc.setSlug(generateSlug(req.getTenDanhMuc()));
        } else {
            danhMuc.setSlug(req.getSlug().trim());
        }

        // Kiểm tra trùng lặp Slug
        if (repository.existsBySlug(danhMuc.getSlug())) {
            throw new RuntimeException("Lỗi: Đường dẫn (Slug) đã tồn tại: " + danhMuc.getSlug());
        }

        // Xử lý Danh mục cha
        if (req.getParentId() != null && !req.getParentId().trim().isEmpty()) {
            DanhMucSanPham realParent = getById(req.getParentId());
            if (realParent.getParent() != null) {
                throw new RuntimeException("Lỗi: Hệ thống chỉ hỗ trợ Danh mục 2 cấp. Không thể chọn một danh mục con làm danh mục cha.");
            }
            danhMuc.setParent(realParent);
        } else {
            danhMuc.setParent(null);
        }

        return repository.save(danhMuc);
    }

    // Cập nhật
    @Transactional
    public DanhMucSanPham update(String id, com.minhanh.backend.dto.DanhMucRequestDto req) {
        DanhMucSanPham existing = getById(id);
        existing.setTenDanhMuc(req.getTenDanhMuc());
        
        // Thiết lập Slug
        String newSlug = (req.getSlug() == null || req.getSlug().trim().isEmpty()) 
                ? generateSlug(req.getTenDanhMuc()) 
                : req.getSlug().trim();
                
        // Kiểm tra tính duy nhất của Slug nếu có sự thay đổi
        if (!newSlug.equals(existing.getSlug()) && repository.existsBySlug(newSlug)) {
            throw new RuntimeException("Lỗi: Đường dẫn (Slug) này đã tồn tại trên một danh mục khác: " + newSlug);
        }
        existing.setSlug(newSlug);

        // Cập nhật thông tin chi tiết
        existing.setMoTa(req.getMoTa());
        if (req.getHinhAnh() != null) existing.setHinhAnh(req.getHinhAnh());
        existing.setThuTu(req.getThuTu() != null ? req.getThuTu() : 0);
        existing.setTrangThai(req.getTrangThai() != null ? req.getTrangThai() : true);
        
        // Cập nhật Danh mục cha
        if (req.getParentId() != null && !req.getParentId().trim().isEmpty()) {
            // Tránh lỗi vòng lặp: Một danh mục không thể làm danh mục cha của chính nó
            if (req.getParentId().equals(id)) {
                throw new RuntimeException("Lỗi: Không thể thiết lập danh mục hiện tại làm danh mục cha của chính nó.");
            }
            // Nạp thực thể chính gốc từ DB để báo cho Hibernate đây là dữ liệu có sẵn (tránh lỗi 500)
            DanhMucSanPham realParent = getById(req.getParentId());
            if (realParent.getParent() != null) {
                throw new RuntimeException("Lỗi: Hệ thống chỉ hỗ trợ Danh mục tối đa 2 cấp. Danh mục cha bạn chọn bản thân nó đã là 1 danh mục con.");
            }
            existing.setParent(realParent);
        } else {
            existing.setParent(null); // Hủy liên kết danh mục cha
        }

        return repository.save(existing);
    }

    // Xử lý Xóa Danh mục theo yêu cầu:
    // 1. Xóa Con: Sản phẩm nhảy lên Cha.
    // 2. Xóa Cha: Xác nhận (Front) -> Xóa vĩnh viễn cả Danh mục & Sản phẩm.
    @Transactional
    public void delete(String id) {
        DanhMucSanPham danhMuc = getById(id);

        if (danhMuc.getParent() != null) {
            // Trường hợp: Xóa Danh mục CON
            String parentId = danhMuc.getParent().getDanhMucId();
            // CHUYỂN SẢN PHẨM SANG CHA
            sanPhamRepository.migrateProductsToParent(id, parentId);
            // XÓA DANH MỤC
            repository.delete(danhMuc);
        } else {
            // Trường hợp: Xóa Danh mục CHA
            // 1. Tìm tất cả ID danh mục con của nó
            List<String> childrenIds = repository.findByParentOrderByThuTuAsc(danhMuc)
                    .stream()
                    .map(DanhMucSanPham::getDanhMucId)
                    .collect(Collectors.toList());

            // 2. XÓA TẤT CẢ SẢN PHẨM (của cả cha và con)
            if (!childrenIds.isEmpty()) {
                sanPhamRepository.deleteByDanhMucIdIn(childrenIds);
                // Xóa danh mục con (Gốc: SET_NULL, nên ta xóa chủ động)
                for (String childId : childrenIds) {
                    repository.deleteById(childId);
                }
            }
            sanPhamRepository.deleteByDanhMucId(id);

            // 3. XÓA DANH MỤC CHA
            repository.delete(danhMuc);
        }
    }
}
