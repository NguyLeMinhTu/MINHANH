package com.minhanh.backend.config;

import com.minhanh.backend.entity.*;
import com.minhanh.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private DanhMucBaiVietRepository danhMucBaiVietRepo;
    
    @Autowired
    private BaiVietRepository baiVietRepo;
    
    @Autowired
    private YeuCauTuVanRepository yeuCauTuVanRepo;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Danh Mục Bài Viết
        if (danhMucBaiVietRepo.count() == 0) {
            System.out.println("Seeding Danh muc bai viet...");
            danhMucBaiVietRepo.saveAll(Arrays.asList(
                DanhMucBaiViet.builder().tenDanhMuc("Tin tức").slug("tin-tuc").moTa("Tin tuc moi nhat").build(),
                DanhMucBaiViet.builder().tenDanhMuc("Kinh nghiệm").slug("kinh-nghiem").moTa("Chia se kinh nghiem").build(),
                DanhMucBaiViet.builder().tenDanhMuc("Khuyến mãi").slug("khuyen-mai").moTa("Uu dai hap dan").build()
            ));
        }

        // 2. Seed Bài Viết mẫu
        if (baiVietRepo.count() == 0) {
            System.out.println("Seeding Bai viet mau...");
            DanhMucBaiViet dm = danhMucBaiVietRepo.findAll().get(0);
            baiVietRepo.save(BaiViet.builder()
                .tieuDe("5 mẫu đồng phục xu hướng 2024")
                .slug("5-mau-dong-phuc-xu-huong-2024")
                .tomTat("Tổng hợp những mẫu thiết kế đẹp nhất năm nay.")
                .noiDung("<p>Đây là bài viết mẫu với nội dung phong phú và <strong>hình ảnh minh họa</strong>.</p>")
                .anhDaiDien("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500")
                .trangThai("PUBLISHED")
                .ngayDang(LocalDateTime.now())
                .views(100)
                .danhMuc(dm)
                .build());
        }

        // 3. Seed Yêu Cầu Tư Vấn
        if (yeuCauTuVanRepo.count() == 0) {
            System.out.println("Seeding Yeu cau tu van...");
            yeuCauTuVanRepo.saveAll(Arrays.asList(
                YeuCauTuVan.builder()
                    .tenKhach("Nguyễn Văn A")
                    .soDienThoai("0901234567")
                    .email("vana@gmail.com")
                    .noiDung("Tôi cần tư vấn gấp về đồng phục áo thun số lượng 500 cái.")
                    .ngayGui(LocalDateTime.now().minusDays(1))
                    .daXuLy(false)
                    .build(),
                YeuCauTuVan.builder()
                    .tenKhach("Trần Thị B")
                    .soDienThoai("0911223344")
                    .email("thib@gmail.com")
                    .noiDung("Cần báo giá áo sơ mi nam size L.")
                    .ngayGui(LocalDateTime.now())
                    .daXuLy(true)
                    .ghiChuNoiBo("Đã gửi báo giá qua mail.")
                    .build()
            ));
        }
    }
}
