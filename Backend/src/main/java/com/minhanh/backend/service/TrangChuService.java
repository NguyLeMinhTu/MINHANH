package com.minhanh.backend.service;

import com.minhanh.backend.dto.*;
import com.minhanh.backend.entity.DanhMucSanPham;
import com.minhanh.backend.entity.HinhAnhSanPham;
import com.minhanh.backend.entity.SanPham;
import com.minhanh.backend.repository.DanhMucSanPhamRepository;
import com.minhanh.backend.repository.FaqRepository;
import com.minhanh.backend.repository.SanPhamRepository;
import com.minhanh.backend.repository.SlideRepository;
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

        /**
         * Tổng hợp dữ liệu cần cho trang chủ trong một response.
         */
    @Transactional(readOnly = true)
    public HomePageResponse getTrangChuData() {
        String publicStatus = "PUBLISHED";

        List<SlideDto> slides = slideRepository.findByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(s -> new SlideDto(
                        s.getSlideId(),
                        s.getTieuDe(),
                        s.getMoTa(),
                        s.getUrlHinh(),
                        s.getLink(),
                        s.getThuTu()
                ))
                .toList();

        List<CategoryDto> danhMuc = danhMucSanPhamRepository.findByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(this::toCategoryDto)
                .toList();

        List<ProductCardDto> sanPhamNoiBat = sanPhamRepository
                .findTop8ByTrangThaiAndSpNoiBatTrueOrderByNgayTaoDesc(publicStatus)
                .stream()
                .map(this::toProductCardDto)
                .toList();

        List<ProductCardDto> sanPhamMoi = sanPhamRepository
                .findTop8ByTrangThaiAndSpMoiTrueOrderByNgayTaoDesc(publicStatus)
                .stream()
                .map(this::toProductCardDto)
                .toList();

        List<FaqDto> faq = faqRepository.findByTrangThaiTrueOrderByThuTuAsc()
                .stream()
                .map(f -> new FaqDto(f.getFaqId(), f.getCauHoi(), f.getTraLoi(), f.getThuTu()))
                .toList();

        return new HomePageResponse(slides, danhMuc, sanPhamNoiBat, sanPhamMoi, faq);
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
        String firstImage = null;
        if (sp.getHinhAnh() != null && !sp.getHinhAnh().isEmpty()) {
            HinhAnhSanPham image = sp.getHinhAnh().get(0);
            firstImage = image != null ? image.getUrlAnh() : null;
        }

        String danhMucId = sp.getDanhMuc() != null ? sp.getDanhMuc().getDanhMucId() : null;
        String danhMucTen = sp.getDanhMuc() != null ? sp.getDanhMuc().getTenDanhMuc() : null;

        return new ProductCardDto(
                sp.getSanPhamId(),
                sp.getTenSanPham(),
                sp.getSlug(),
                sp.getGiaBan(),
                sp.getGiaKhuyenMai(),
                firstImage,
                danhMucId,
                danhMucTen,
                sp.getSpMoi(),
                sp.getSpNoiBat()
        );
    }
}