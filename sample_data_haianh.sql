USE minhanh_db;

-- Xóa dữ liệu cũ (nếu có) để tránh lỗi trùng lặp khoá ngoại khi chạy nhiều lần
DELETE FROM hinh_anh_san_pham WHERE san_pham_id IN ('aaaaaaaa-1111-1111-1111-111111111111', 'bbbbbbbb-2222-2222-2222-222222222222', 'cccccccc-3333-3333-3333-333333333333', 'dddddddd-4444-4444-4444-444444444444', 'eeeeeeee-5555-5555-5555-555555555555');
DELETE FROM san_pham WHERE danh_muc_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');
DELETE FROM danh_muc_san_pham WHERE danh_muc_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');

-- 1. Thêm Danh mục sản phẩm (Đồng phục)
INSERT INTO danh_muc_san_pham (danh_muc_id, ten_danh_muc, slug, mo_ta, trang_thai) VALUES
('11111111-1111-1111-1111-111111111111', 'Đồng phục Áo Lớp', 'dong-phuc-ao-lop', 'Chuyên thiết kế áo lớp, áo nhóm cá tính, Gen Z', 1),
('22222222-2222-2222-2222-222222222222', 'Đồng phục Công sở', 'dong-phuc-cong-so', 'Đồng phục áo polo, sơ mi, vest cho doanh nghiệp', 1),
('33333333-3333-3333-3333-333333333333', 'Đồng phục Nhà hàng', 'dong-phuc-nha-hang', 'Đồng phục tạp dề, áo bếp trưởng chuyên nghiệp', 1);

-- 2. Thêm Sản phẩm (Đồng phục)
INSERT INTO san_pham (san_pham_id, ten_san_pham, slug, mo_ta, gia_ban, gia_khuyen_mai, so_luong_ton, views, luot_mua, trang_thai, danh_muc_id, thuong_hieu, chat_lieu, don_vi_tinh, ngay_tao) VALUES
('aaaaaaaa-1111-1111-1111-111111111111', 'Áo Lớp Oversize Cổ Tròn Mẫu Hologram', 'ao-lop-oversize-hologram', 'Áo lớp form rộng cực chất, in decal Hologram phản quang nổi bật dưới ánh sáng. Phù hợp làm đồng phục lớp, sự kiện team.', 180000, 150000, 500, 450, 20, 'cong_khai', '11111111-1111-1111-1111-111111111111', 'Hải Anh Uniform', 'Cotton 100%', 'Áo', NOW()),
('bbbbbbbb-2222-2222-2222-222222222222', 'Áo Polo Công Sở Vải Cá Sấu Thái', 'ao-polo-cong-so-ca-sau', 'Áo polo đồng phục cho công ty, form chuẩn. Chất vải cá sấu Thái Lan thoáng mát, co giãn 4 chiều.', 220000, 210000, 1000, 1200, 150, 'cong_khai', '22222222-2222-2222-2222-222222222222', 'Hải Anh Uniform', 'Cá sấu Thái cao cấp', 'Áo', NOW()),
('cccccccc-3333-3333-3333-333333333333', 'Áo Bếp Trưởng Vải Kaki Hàn Quốc', 'ao-bep-truong-kaki', 'Áo bếp trưởng cộc tay, thiết kế viền đen sang trọng, vải kaki chống nhăn chống nóng cực tốt trong bếp.', 250000, NULL, 150, 300, 45, 'cong_khai', '33333333-3333-3333-3333-333333333333', 'Hải Anh Uniform', 'Kaki Hàn Quốc', 'Áo', NOW()),
('dddddddd-4444-4444-4444-444444444444', 'Áo Sơ Mi Đồng Phục Văn Phòng', 'ao-so-mi-dong-phuc-van-phong', 'Áo sơ mi dáng ôm vừa (regular fit), mếch cổ cứng cáp, phù hợp cho anh em dân văn phòng, sơ vin lịch sự.', 280000, 250000, 300, 850, 110, 'cong_khai', '22222222-2222-2222-2222-222222222222', 'Hải Anh Uniform', 'Bamboo (Sợi tre tự nhiên)', 'Áo', NOW()),
('eeeeeeee-5555-5555-5555-555555555555', 'Áo Lớp Phản Quang 3D Galaxy Trendy', 'ao-lop-phan-quang-3d', 'Mẫu áo hot trend với mặt lưng in hoạ tiết dải ngân hà phản quang phá cách siêu ngầu vào ban đêm.', 195000, 185000, 250, 2100, 300, 'cong_khai', '11111111-1111-1111-1111-111111111111', 'Hải Anh Uniform', 'Cotton 100%', 'Áo', NOW());

-- 3. Thêm Hình ảnh Sản phẩm (Lấy từ Cloudinary của bạn)
INSERT INTO hinh_anh_san_pham (hinh_anh_id, san_pham_id, url_anh) VALUES
(UUID(), 'aaaaaaaa-1111-1111-1111-111111111111', 'https://res.cloudinary.com/dntzxu2tx/image/upload/v1774242456/minhanh/yvjw2ggoc9llfjzuqday.jpg'),
(UUID(), 'bbbbbbbb-2222-2222-2222-222222222222', 'https://res.cloudinary.com/dntzxu2tx/image/upload/v1774242457/minhanh/hyvmacaw9acpakpvz6ht.jpg'),
(UUID(), 'cccccccc-3333-3333-3333-333333333333', 'https://res.cloudinary.com/dntzxu2tx/image/upload/v1774242458/minhanh/xwjypzq9tgdx6payghjw.jpg'),
(UUID(), 'dddddddd-4444-4444-4444-444444444444', 'https://res.cloudinary.com/dntzxu2tx/image/upload/v1774242459/minhanh/hxjbxoorzutmxo9gexk1.jpg'),
(UUID(), 'eeeeeeee-5555-5555-5555-555555555555', 'https://res.cloudinary.com/dntzxu2tx/image/upload/v1774242456/minhanh/yvjw2ggoc9llfjzuqday.jpg');
