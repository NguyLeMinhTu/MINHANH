import aoThun1 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-1.jpg'
import aoThun2 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-2.jpg'
import aoThun3 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-3.jpg'
import aoThun4 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-4.jpg'

import anhBaiViet from '../assets/mega-menu-ao-vest.jpg'

import slideBanner1 from '../assets/Banners/BANNER_AOKHOAC.jpg'
import slideBanner2 from '../assets/Banners/BANNER_AOTHUN.jpg'
import slideBanner3 from '../assets/Banners/BANNER_DULICH.jpg'
import slideBanner4 from '../assets/Banners/BANNER_VEST.jpg'



// assets.js - Dữ liệu mẫu cho website đồng phục

// Hàm tạo UUID giả (không phải chuẩn nhưng đủ dùng)
const generateId = () => Math.random().toString(36).substr(2, 9);

// Danh mục sản phẩm
const danhMucSanPham = [
    {
        danh_muc_id: 'dm1',
        ten_danh_muc: 'Áo thun',
        slug: 'ao-thun',
        mo_ta: 'Các loại áo thun chất lượng cao',
        parent_id: null,
        hinh_anh: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        thu_tu: 1,
        trang_thai: true
    },
    {
        danh_muc_id: 'dm2',
        ten_danh_muc: 'Áo sơ mi',
        slug: 'ao-so-mi',
        mo_ta: 'Áo sơ mi công sở, lịch lãm',
        parent_id: null,
        hinh_anh: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        thu_tu: 2,
        trang_thai: true
    },
    {
        danh_muc_id: 'dm3',
        ten_danh_muc: 'Quần tây',
        slug: 'quan-tay',
        mo_ta: 'Quần tây nam, nữ',
        parent_id: null,
        hinh_anh: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        thu_tu: 3,
        trang_thai: true
    },
    {
        danh_muc_id: 'dm4',
        ten_danh_muc: 'Đồng phục thể thao',
        slug: 'dong-phuc-the-thao',
        mo_ta: 'Áo đá bóng, áo thể thao',
        parent_id: null,
        hinh_anh: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500',
        thu_tu: 4,
        trang_thai: true
    },
    // Danh mục con
    {
        danh_muc_id: 'dm5',
        ten_danh_muc: 'Áo thun nam',
        slug: 'ao-thun-nam',
        mo_ta: 'Áo thun dành cho nam',
        parent_id: 'dm1',
        hinh_anh: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
        thu_tu: 1,
        trang_thai: true
    },
    {
        danh_muc_id: 'dm6',
        ten_danh_muc: 'Áo thun nữ',
        slug: 'ao-thun-nu',
        mo_ta: 'Áo thun dành cho nữ',
        parent_id: 'dm1',
        hinh_anh: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
        thu_tu: 2,
        trang_thai: true
    }
];

// Người dùng (đã tích hợp vai trò)
const nguoiDung = [
    {
        nguoi_dung_id: 'nd1',
        ten: 'Admin',
        email: 'admin@gmail.com',
        mat_khau: 'admin123', // Giả sử đã hash
        so_dien_thoai: '0901234567',
        anh_dai_dien: 'https://randomuser.me/api/portraits/men/1.jpg',
        gioi_tinh: 'Nam',
        ngay_sinh: '1990-01-01',
        dia_chi: '123 Nguyễn Huệ, Q1, TP.HCM',
        vai_tro: 'admin', // Thay vì vai_tro_id
        ngay_tao: '2023-01-01 10:00:00',
        trang_thai: true,
        reset_token: null,
        reset_token_expire: null
    },
    {
        nguoi_dung_id: 'nd2',
        ten: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        mat_khau: 'hashed_password_2',
        so_dien_thoai: '0912345678',
        anh_dai_dien: 'https://randomuser.me/api/portraits/men/2.jpg',
        gioi_tinh: 'Nam',
        ngay_sinh: '1995-05-15',
        dia_chi: '456 Lê Lợi, Q3, TP.HCM',
        vai_tro: 'user',
        ngay_tao: '2023-02-10 14:30:00',
        trang_thai: true,
        reset_token: null,
        reset_token_expire: null
    },
    {
        nguoi_dung_id: 'nd3',
        ten: 'Trần Thị B',
        email: 'tranthib@gmail.com',
        mat_khau: 'hashed_password_3',
        so_dien_thoai: '0923456789',
        anh_dai_dien: 'https://randomuser.me/api/portraits/women/1.jpg',
        gioi_tinh: 'Nữ',
        ngay_sinh: '1998-08-20',
        dia_chi: '789 Võ Văn Tần, Q10, TP.HCM',
        vai_tro: 'user',
        ngay_tao: '2023-03-05 09:15:00',
        trang_thai: true,
        reset_token: null,
        reset_token_expire: null
    },
    {
        nguoi_dung_id: 'nd4',
        ten: 'Lê Văn C',
        email: 'levanc@company.com',
        mat_khau: 'hashed_password_4',
        so_dien_thoai: '0934567890',
        anh_dai_dien: null,
        gioi_tinh: 'Nam',
        ngay_sinh: '1988-12-10',
        dia_chi: '321 Cách Mạng Tháng 8, Tân Bình, TP.HCM',
        vai_tro: 'user',
        ngay_tao: '2023-04-12 16:45:00',
        trang_thai: false, // Tài khoản bị khóa
        reset_token: null,
        reset_token_expire: null
    }
];

// Sản phẩm (mỗi sản phẩm có 8 ảnh trong mảng JSON)
const sanPham = [
    {
        san_pham_id: 'sp1',
        ten_san_pham: 'Áo thun đồng phục công sở nam tay ngắn',
        slug: 'ao-thun-dong-phuc-cong-so-nam-tay-ngan',
        mo_ta: 'Áo thun nam chất liệu cotton cao cấp, form regular fit, phù hợp môi trường công sở hoặc sự kiện. Có nhiều màu sắc và kích thước.',
        hinh_anh: [
            aoThun1,
            aoThun2,
            aoThun3,
            aoThun4,
        ],
        meta_title: 'Áo thun đồng phục công sở nam - Chất lượng cao, giá tốt',
        meta_description: 'Áo thun đồng phục công sở nam với chất liệu cotton thoáng mát, bền đẹp, thích hợp in ấn logo. Giao hàng nhanh tại TP.HCM.',
        gia_tham_khao: 250000,
        gia_ban: 220000,
        gia_khuyen_mai: 199000,
        so_luong_ton: 150,
        don_vi_tinh: 'Cái',
        thuong_hieu: 'Việt Tiến',
        xuat_xu: 'Việt Nam',
        chat_lieu: 'Cotton 65/35 (65% cotton, 35% polyester)',
        bao_quan: 'Giặt ở nhiệt độ dưới 30°C, không dùng chất tẩy mạnh, phơi trong bóng râm.',
        tags: 'áo thun, đồng phục, công sở, nam, tay ngắn',
        views: 1245,
        luot_mua: 87,
        sp_noi_bat: true,
        sp_moi: false,
        trang_thai: 'cong_khai',
        danh_muc_id: 'dm5', // Áo thun nam
        ngay_tao: '2024-01-15 08:30:00'
    },
    {
        san_pham_id: 'sp2',
        ten_san_pham: 'Áo thun nữ cổ tròn tay lỡ',
        slug: 'ao-thun-nu-co-tron-tay-lo',
        mo_ta: 'Áo thun nữ form rộng, chất liệu cotton mềm mại, thấm hút mồ hôi tốt. Phù hợp mặc hàng ngày hoặc làm đồng phục công ty.',
        hinh_anh: [
            aoThun1,
            aoThun2,
            aoThun3,
            aoThun4,
            aoThun1,
            aoThun2,
            aoThun3,
            aoThun4,
        ],
        meta_title: 'Áo thun nữ cổ tròn tay lỡ - Thoải mái, dễ thương',
        meta_description: 'Áo thun nữ form rộng, chất cotton mềm mại, nhiều màu sắc. Thích hợp làm đồng phục công ty hoặc mặc thường ngày.',
        gia_tham_khao: 230000,
        gia_ban: 200000,
        gia_khuyen_mai: 180000,
        so_luong_ton: 200,
        don_vi_tinh: 'Cái',
        thuong_hieu: 'Thái Tuấn',
        xuat_xu: 'Việt Nam',
        chat_lieu: 'Cotton 100%',
        bao_quan: 'Giặt tay hoặc máy nhẹ, không ngâm lâu, phơi nơi thoáng mát.',
        tags: 'áo thun nữ, đồng phục, cổ tròn, tay lỡ',
        views: 890,
        luot_mua: 45,
        sp_noi_bat: true,
        sp_moi: true,
        trang_thai: 'cong_khai',
        danh_muc_id: 'dm6', // Áo thun nữ
        ngay_tao: '2024-02-20 10:15:00'
    },
    {
        san_pham_id: 'sp3',
        ten_san_pham: 'Áo sơ mi nam dài tay',
        slug: 'ao-so-mi-nam-dai-tay',
        mo_ta: 'Áo sơ mi nam chất liệu cotton pha, form slim fit, thích hợp mặc công sở hoặc đi tiệc. Có nhiều màu trắng, xanh nhạt, hồng nhạt.',
        hinh_anh: [
            aoThun1,
            aoThun2,
            aoThun3,
            aoThun4,
        ],
        meta_title: 'Áo sơ mi nam dài tay cao cấp - Lịch lãm, sang trọng',
        meta_description: 'Áo sơ mi nam dài tay với chất liệu cao cấp, form chuẩn, thích hợp cho môi trường công sở và sự kiện.',
        gia_tham_khao: 350000,
        gia_ban: 320000,
        gia_khuyen_mai: null,
        so_luong_ton: 80,
        don_vi_tinh: 'Cái',
        thuong_hieu: 'Pierre Cardin',
        xuat_xu: 'Việt Nam',
        chat_lieu: 'Cotton pha 70/30',
        bao_quan: 'Ủi ở nhiệt độ trung bình, giặt khô hoặc giặt tay nhẹ nhàng.',
        tags: 'sơ mi, nam, dài tay, công sở',
        views: 2100,
        luot_mua: 120,
        sp_noi_bat: true,
        sp_moi: false,
        trang_thai: 'cong_khai',
        danh_muc_id: 'dm2', // Áo sơ mi
        ngay_tao: '2023-11-05 14:20:00'
    },
    {
        san_pham_id: 'sp4',
        ten_san_pham: 'Quần tây nam ống đứng',
        slug: 'quan-tay-nam-ong-dung',
        mo_ta: 'Quần tây nam ống đứng, form lịch sự, chất liệu kaki cao cấp, thích hợp mặc công sở hoặc dự tiệc.',
        hinh_anh: [
            aoThun1,
            aoThun2,
            aoThun3,
            aoThun4,
        ],
        meta_title: 'Quần tây nam ống đứng - Thời trang, lịch lãm',
        meta_description: 'Quần tây nam ống đứng chất liệu kaki cao cấp, form chuẩn, thích hợp cho dân văn phòng.',
        gia_tham_khao: 400000,
        gia_ban: 380000,
        gia_khuyen_mai: 350000,
        so_luong_ton: 60,
        don_vi_tinh: 'Cái',
        thuong_hieu: 'Việt Tiến',
        xuat_xu: 'Việt Nam',
        chat_lieu: 'Kaki 98% cotton, 2% spandex',
        bao_quan: 'Giặt khô hoặc giặt máy nhẹ, là hơi nước.',
        tags: 'quần tây, nam, ống đứng, công sở',
        views: 950,
        luot_mua: 32,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: 'cong_khai',
        danh_muc_id: 'dm3', // Quần tây
        ngay_tao: '2023-12-10 09:45:00'
    }
];

// Hình ảnh sản phẩm (nếu muốn dùng bảng riêng) - Mỗi sản phẩm có thể có thêm ảnh phụ
const hinhAnhSanPham = [
    // Ảnh phụ cho sp1
    { hinh_anh_id: 'ha1', san_pham_id: 'sp1', url_anh: aoThun1 },
    { hinh_anh_id: 'ha2', san_pham_id: 'sp1', url_anh: aoThun2 },
    { hinh_anh_id: 'ha3', san_pham_id: 'sp1', url_anh: aoThun3 },
    // Ảnh phụ cho sp2
    { hinh_anh_id: 'ha4', san_pham_id: 'sp2', url_anh: aoThun1 },
    { hinh_anh_id: 'ha5', san_pham_id: 'sp2', url_anh: aoThun2 },
    { hinh_anh_id: 'ha6', san_pham_id: 'sp2', url_anh: aoThun3 },
    // Ảnh phụ cho sp3
    { hinh_anh_id: 'ha7', san_pham_id: 'sp3', url_anh: aoThun1 },
    { hinh_anh_id: 'ha8', san_pham_id: 'sp3', url_anh: aoThun2 },
    { hinh_anh_id: 'ha9', san_pham_id: 'sp3', url_anh: aoThun3 },
    // Ảnh phụ cho sp4
    { hinh_anh_id: 'ha10', san_pham_id: 'sp4', url_anh: aoThun1 },
    { hinh_anh_id: 'ha11', san_pham_id: 'sp4', url_anh: aoThun2 },
    { hinh_anh_id: 'ha12', san_pham_id: 'sp4', url_anh: aoThun3 }
];

// Danh mục bài viết
const danhMucBaiViet = [
    {
        danh_muc_bai_viet_id: 'dmbv1',
        ten_danh_muc: 'Tin tức',
        slug: 'tin-tuc',
        mo_ta: 'Các tin tức mới nhất về đồng phục',
        parent_id: null
    },
    {
        danh_muc_bai_viet_id: 'dmbv2',
        ten_danh_muc: 'Kinh nghiệm chọn đồng phục',
        slug: 'kinh-nghiem-chon-dong-phuc',
        mo_ta: 'Chia sẻ kinh nghiệm chọn đồng phục đẹp và chất lượng',
        parent_id: null
    },
    {
        danh_muc_bai_viet_id: 'dmbv3',
        ten_danh_muc: 'Xu hướng thời trang',
        slug: 'xu-huong-thoi-trang',
        mo_ta: 'Cập nhật xu hướng thời trang đồng phục mới nhất',
        parent_id: null
    },
    {
        danh_muc_bai_viet_id: 'dmbv4',
        ten_danh_muc: 'Khuyến mãi',
        slug: 'khuyen-mai',
        mo_ta: 'Chương trình khuyến mãi hấp dẫn',
        parent_id: null
    }
];

// Bài viết
const baiViet = [
    {
        bai_viet_id: 'bv1',
        tieu_de: '5 lưu ý khi chọn đồng phục công ty',
        slug: '5-luu-y-khi-chon-dong-phuc-cong-ty',
        noi_dung: '<p>Đồng phục công ty không chỉ là trang phục mà còn là bộ mặt của doanh nghiệp. Dưới đây là 5 lưu ý quan trọng:</p><ul><li>Chất liệu thoáng mát, thấm hút mồ hôi</li><li>Màu sắc phù hợp với thương hiệu</li><li>Kiểu dáng lịch sự, thoải mái</li><li>Đơn vị may uy tín</li><li>Giá cả hợp lý</li></ul>',
        tom_tat: 'Những điều cần biết khi chọn đồng phục cho doanh nghiệp của bạn.',
        anh_dai_dien: anhBaiViet,
        views: 350,
        tags: 'đồng phục, công ty, lưu ý',
        trang_thai: 'cong_khai',
        danh_muc_bai_viet_id: 'dmbv2',
        nguoi_dung_id: 'nd1',
        ngay_dang: '2024-03-10 09:00:00'
    },
    {
        bai_viet_id: 'bv2',
        tieu_de: 'Xu hướng đồng phục công sở 2024',
        slug: 'xu-huong-dong-phuc-cong-so-2024',
        noi_dung: '<p>Năm 2024, đồng phục công sở có những xu hướng mới như:</p><p>- Chất liệu tái chế thân thiện môi trường<br>- Màu pastel nhẹ nhàng<br>- Thiết kế tối giản nhưng tinh tế<br>- Áo thun kết hợp blazer</p>',
        tom_tat: 'Cập nhật những xu hướng đồng phục công sở hot nhất năm 2024.',
        anh_dai_dien: anhBaiViet,
        views: 520,
        tags: 'xu hướng, đồng phục, công sở, 2024',
        trang_thai: 'cong_khai',
        danh_muc_bai_viet_id: 'dmbv3',
        nguoi_dung_id: 'nd2',
        ngay_dang: '2024-03-15 14:30:00'
    },
    {
        bai_viet_id: 'bv3',
        tieu_de: 'Khai trương showroom mới tại Quận 9',
        slug: 'khai-truong-showroom-moi-tai-quan-9',
        noi_dung: '<p>Chúng tôi hân hạnh thông báo khai trương showroom mới tại địa chỉ 123 Đường số 2, Quận 9, TP.HCM. Đến với showroom, quý khách sẽ được trải nghiệm trực tiếp các mẫu đồng phục mới nhất và nhận nhiều ưu đãi hấp dẫn.</p>',
        tom_tat: 'Showroom mới khai trương với nhiều ưu đãi đặc biệt.',
        anh_dai_dien: anhBaiViet,
        views: 180,
        tags: 'khai trương, showroom, sự kiện',
        trang_thai: 'cong_khai',
        danh_muc_bai_viet_id: 'dmbv1',
        nguoi_dung_id: 'nd1',
        ngay_dang: '2024-03-20 10:00:00'
    }
];

// Hình ảnh bài viết
const hinhAnhBaiViet = [
    { hinh_anh_id: 'habv1', bai_viet_id: 'bv1', url_anh: anhBaiViet },
    { hinh_anh_id: 'habv2', bai_viet_id: 'bv1', url_anh: anhBaiViet },
    { hinh_anh_id: 'habv3', bai_viet_id: 'bv2', url_anh: anhBaiViet },
    { hinh_anh_id: 'habv4', bai_viet_id: 'bv3', url_anh: anhBaiViet }
];

// Yêu cầu tư vấn
const yeuCauTuVan = [
    {
        yeu_cau_id: 'yc1',
        ten_khach: 'Nguyễn Thị D',
        so_dien_thoai: '0945678901',
        email: 'nguyenthid@gmail.com',
        noi_dung: 'Công ty tôi cần đặt 100 áo thun đồng phục, có in logo. Vui lòng báo giá và thời gian thực hiện.',
        san_pham_id: 'sp1',
        ngay_gui: '2024-03-21 09:30:00',
        da_xu_ly: false,
        ghi_chu_noi_bo: null
    },
    {
        yeu_cau_id: 'yc2',
        ten_khach: 'Trần Văn E',
        so_dien_thoai: '0956789012',
        email: 'tranvane@yahoo.com',
        noi_dung: 'Tôi muốn mua 5 cái áo sơ mi nam size L màu trắng. Còn hàng không?',
        san_pham_id: 'sp3',
        ngay_gui: '2024-03-22 14:15:00',
        da_xu_ly: true,
        ghi_chu_noi_bo: 'Đã gọi điện báo còn hàng, khách sẽ đến lấy'
    },
    {
        yeu_cau_id: 'yc3',
        ten_khach: 'Lê Thị F',
        so_dien_thoai: '0967890123',
        email: 'lethif@gmail.com',
        noi_dung: 'Cho tôi hỏi về chất liệu vải của áo thun nữ. Tôi cần đặt 20 cái cho nhóm.',
        san_pham_id: 'sp2',
        ngay_gui: '2024-03-23 11:00:00',
        da_xu_ly: false,
        ghi_chu_noi_bo: null
    }
];

// Cấu hình website
const cauHinh = [
    { khoa: 'zalo_link', gia_tri: 'https://zalo.me/0123456789', mo_ta: 'Link Zalo liên hệ' },
    { khoa: 'hotline', gia_tri: '1900 1234', mo_ta: 'Số điện thoại hotline' },
    { khoa: 'email_lien_he', gia_tri: 'info@dongphuc.com', mo_ta: 'Email liên hệ' },
    { khoa: 'dia_chi', gia_tri: '123 Đường ABC, Quận XYZ, TP.HCM', mo_ta: 'Địa chỉ cửa hàng' },
    { khoa: 'facebook_link', gia_tri: 'https://facebook.com/dongphuc', mo_ta: 'Link Facebook' },
    { khoa: 'instagram_link', gia_tri: 'https://instagram.com/dongphuc', mo_ta: 'Link Instagram' }
];

// Slide
const slide = [
    {
        slide_id: 'sld1',
        tieu_de: 'Đồng phục chất lượng - Giá tốt',
        mo_ta: 'Ưu đãi lên đến 20% khi đặt hàng trong tháng này',
        url_hinh: slideBanner1,
        link: '/san-pham',
        thu_tu: 1,
        trang_thai: true
    },
    {
        slide_id: 'sld2',
        tieu_de: 'Áo thun đồng phục công sở',
        mo_ta: 'Đa dạng mẫu mã, màu sắc',
        url_hinh: slideBanner2,
        link: '/danh-muc/ao-thun',
        thu_tu: 2,
        trang_thai: true
    },
    {
        slide_id: 'sld3',
        tieu_de: 'Miễn phí thiết kế in ấn',
        mo_ta: 'Áp dụng cho đơn hàng từ 50 sản phẩm',
        url_hinh: slideBanner3,
        link: '/khuyen-mai',
        thu_tu: 3,
        trang_thai: true
    }
];

// FAQ
const faq = [
    {
        faq_id: 'faq1',
        cau_hoi: 'Thời gian giao hàng bao lâu?',
        tra_loi: 'Thời gian giao hàng từ 3-5 ngày làm việc đối với nội thành TP.HCM, 5-7 ngày đối với tỉnh xa.',
        thu_tu: 1,
        trang_thai: true
    },
    {
        faq_id: 'faq2',
        cau_hoi: 'Có nhận in ấn logo lên áo không?',
        tra_loi: 'Có, chúng tôi nhận in ấn logo với số lượng tối thiểu 20 cái. Miễn phí thiết kế.',
        thu_tu: 2,
        trang_thai: true
    },
    {
        faq_id: 'faq3',
        cau_hoi: 'Chất liệu vải có bền không?',
        tra_loi: 'Chúng tôi sử dụng vải cotton cao cấp, bền màu, ít nhăn, thấm hút mồ hôi tốt.',
        thu_tu: 3,
        trang_thai: true
    },
    {
        faq_id: 'faq4',
        cau_hoi: 'Có đổi trả hàng không?',
        tra_loi: 'Đổi trả trong vòng 7 ngày nếu lỗi từ nhà sản xuất. Không đổi trả do khách chọn sai kích thước.',
        thu_tu: 4,
        trang_thai: true
    }
];

// Liên hệ (mẫu)
const lienHe = [
    {
        lien_he_id: 'lh1',
        ho_ten: 'Phạm Văn G',
        email: 'phamvang@gmail.com',
        so_dien_thoai: '0978901234',
        tieu_de: 'Hợp tác đại lý',
        noi_dung: 'Tôi muốn làm đại lý phân phối sản phẩm của công ty. Xin vui lòng liên hệ tư vấn.',
        ngay_gui: '2024-03-24 08:45:00',
        da_xu_ly: false
    },
    {
        lien_he_id: 'lh2',
        ho_ten: 'Vũ Thị H',
        email: 'vuthih@gmail.com',
        so_dien_thoai: '0989012345',
        tieu_de: 'Góp ý về chất lượng sản phẩm',
        noi_dung: 'Tôi mua áo thun tháng trước, sau vài lần giặt bị phai màu. Mong công ty cải thiện.',
        ngay_gui: '2024-03-25 16:30:00',
        da_xu_ly: true
    }
];

export {
    danhMucSanPham,
    nguoiDung,
    sanPham,
    hinhAnhSanPham,
    danhMucBaiViet,
    baiViet,
    hinhAnhBaiViet,
    yeuCauTuVan,
    cauHinh,
    slide,
    faq,
    lienHe
};