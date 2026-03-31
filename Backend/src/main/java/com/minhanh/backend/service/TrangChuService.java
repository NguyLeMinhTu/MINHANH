package com.minhanh.backend.service;

import com.minhanh.backend.dto.*;
import com.minhanh.backend.entity.DanhMucSanPham;
import com.minhanh.backend.entity.HinhAnhSanPham;
import com.minhanh.backend.entity.SanPham;
import com.minhanh.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrangChuService {

    private final SlideRepository slideRepository;
    private final DanhMucSanPhamRepository danhMucSanPhamRepository;
    private final SanPhamRepository sanPhamRepository;
    private final FaqRepository faqRepository;
    private final CollectionRepository collectionRepository;
    private final ThongKeRepository thongKeRepository;

    /**
     * Ghi nhận lượt truy cập trang chủ.
     */
    @Transactional
    public void recordVisit() {
        com.minhanh.backend.entity.ThongKe tk = thongKeRepository.findById("PAGE_VIEWS")
                .orElse(new com.minhanh.backend.entity.ThongKe("PAGE_VIEWS", 0L));
        tk.setGiaTri(tk.getGiaTri() + 1);
        thongKeRepository.save(tk);
    }

        /**
         * Tổng hợp dữ liệu cần cho trang chủ trong một response.
         */
    @Transactional(readOnly = true)
    public HomePageResponse getTrangChuData() {
        // Trạng thái sản phẩm được hiển thị công khai (khớp với SanPhamService.PUBLISHED)
        String publicStatus = "cong_khai";

        List<SlideDto> slides = slideRepository.findByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(s -> new SlideDto(
                        s.getSlideId(),
                        s.getTieuDe(),
                        s.getMoTa(),
                        s.getUrlHinh(),
                        s.getLink(),
                        s.getThuTu(),
                        s.getTrangThai()
                ))
                .toList();
        
        List<CollectionDto> collections = collectionRepository.findByTrangThaiOrderByThuTuAsc("hien")
                .stream()
                .map(c -> new CollectionDto(
                        c.getId(),
                        c.getTieuDe(),
                        c.getMoTa(),
                        c.getUrlHinh(),
                        c.getLink(),
                        c.getThuTu(),
                        c.getTrangThai()
                ))
                .toList();

        List<CategoryDto> danhMuc = danhMucSanPhamRepository.findTop8ByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(this::toCategoryDto)
                .toList();

        List<ProductCardDto> sanPhamNoiBat = sanPhamRepository
                .findTop10ByTrangThaiAndSpNoiBatTrueOrderByNgayTaoDesc(publicStatus)
                .stream()
                .map(this::toProductCardDto)
                .toList();

        List<ProductCardDto> sanPhamMoi = sanPhamRepository
                .findTop10ByTrangThaiAndSpMoiTrueOrderByNgayTaoDesc(publicStatus)
                .stream()
                .map(this::toProductCardDto)
                .toList();

        List<FaqDto> faq = faqRepository.findByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(f -> new FaqDto(f.getFaqId(), f.getCauHoi(), f.getTraLoi(), f.getThuTu()))
                .toList();

        return new HomePageResponse(slides, danhMuc, sanPhamNoiBat, sanPhamMoi, collections, faq);
    }

        /**
         * Mapping entity danh mục sang DTO hiển thị ở frontend.
         */
    CategoryDto toCategoryDto(DanhMucSanPham dm) {
        return new CategoryDto(
                dm.getDanhMucId(),
                dm.getTenDanhMuc(),
                dm.getSlug(),
                dm.getHinhAnh()
        );
    }

        /**
         * Mapping entity sản phẩm sang DTO dạng card cho list trang chủ.
         */
    ProductCardDto toProductCardDto(SanPham sp) {
        List<String> images = sp.getHinhAnh() != null 
                ? sp.getHinhAnh().stream().map(HinhAnhSanPham::getUrlAnh).toList() 
                : List.of();
        
        String firstImage = images.isEmpty() ? null : images.get(0);

        String danhMucId = sp.getDanhMuc() != null ? sp.getDanhMuc().getDanhMucId() : null;
        String danhMucTen = sp.getDanhMuc() != null ? sp.getDanhMuc().getTenDanhMuc() : null;

        return new ProductCardDto(
                sp.getSanPhamId(),
                sp.getTenSanPham(),
                sp.getSlug(),
                sp.getGiaBan(),
                sp.getGiaKhuyenMai(),
                firstImage,
                images,
                danhMucId,
                danhMucTen,
                sp.getThuongHieu(),
                sp.getChatLieu(),
                sp.getXuatXu(),
                sp.getSpMoi(),
                sp.getSpNoiBat()
        );
    }
}