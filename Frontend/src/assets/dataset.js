// ÁO SƠ MI 
import aoSoMi1 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-trang-vinfast-01.jpg'
import aoSoMi2 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-trang-vinfast-03.jpg'
import aoSoMi3 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-trang-vinfast-04.jpg'
import aoSoMi4 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-trang-vinfast-05.jpg'

import aoSoMi11 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-xanh-phoi-trang-byd-01.jpg'
import aoSoMi12 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-xanh-phoi-trang-byd-02.jpg'
import aoSoMi13 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-xanh-phoi-trang-byd-03.jpg'
import aoSoMi14 from '../assets/dong-phuc-ao-so-mi-dai-tay-mau-xanh-phoi-trang-byd-04.jpg'


// ÁO POLO
import aoPolo1 from '../assets/ao-thun-dong-phuc-cong-ty-coolmate-2-mau-nau-2.jpg'
import aoPolo2 from '../assets/ao-thun-dong-phuc-cong-ty-coolmate-2-mau-nau-5.jpg'
import aoPolo3 from '../assets/ao-thun-dong-phuc-cong-ty-coolmate-2-mau-nau-6.jpg'
import aoPolo4 from '../assets/ao-thun-dong-phuc-cong-ty-coolmate-2-mau-nau-8.jpg'

// ÁO THUN 
import aoThun1 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-1.jpg'
import aoThun2 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-2.jpg'
import aoThun3 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-3.jpg'
import aoThun4 from '../assets/ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-4.jpg'

// ÁO BẢO HỘ 
import aoBaoHo1 from "../assets/quan-ao-bao-ho-lao-dong-05-1.jpg"
import aoBaoHo2 from "../assets/quan-ao-bao-ho-lao-dong-05-6.jpg"
import aoBaoHo3 from "../assets/quan-ao-bao-ho-lao-dong-05-7.jpg"
import aoBaoHo4 from "../assets/quan-ao-bao-ho-lao-dong-05-8.jpg"


// ICON DANH MỤC SẢN PHẨN
import iconDmAoThun from '../assets/icon-dm-aothun-co-tron.png'
import iconDmAoPolo from '../assets/icon-dm-ao-polo.png'
import iconDmAoSoMi from '../assets/icon-dm-ao-so-mi.png'
import iconDMAoBaoHo from '../assets/icon-dm-ao-bao-ho.png'

// Frontend sample dataset that mirrors the DB schema in /MINHANH/db.md
// This is mock data for UI development (no real persistence).
// All IDs are UUID strings (CHAR(36)) and foreign-keys are consistent.

const now = "2026-03-23T00:00:00Z";

// Deterministic UUID helper (stable across builds; good enough for mock UI data).
const makeUuid = (prefixByte, n) => {
    const prefix = String(prefixByte).toLowerCase();
    const tail = Number(n).toString(16).padStart(12, '0');
    return `${prefix.repeat(4)}-${prefix.repeat(2)}-${prefix.repeat(2)}-${prefix.repeat(2)}-${tail}`;
};

// Deterministic UUIDs (keep stable so UI routes/tests don't change).
const IDs = {
    // Product categories
    dmRootCompany: makeUuid('11', 1),
    dmPolo: makeUuid('11', 2),
    dmOffice: makeUuid('11', 3),
    dmThun: makeUuid('11', 4),
    dmSoMi: makeUuid('11', 5),
    dmBaoHo: makeUuid('11', 6),

    // Contacts
    lh1: makeUuid('cc', 1),

    // Products (seeded ranges so adding more later doesn't reshuffle IDs)
    spRootCompany1: makeUuid('33', 1),
    spRootCompany2: makeUuid('33', 2),
    spRootCompany3: makeUuid('33', 3),
    spRootCompany4: makeUuid('33', 4),
    spRootCompany5: makeUuid('33', 5),

    spPolo1: makeUuid('33', 101),
    spPolo2: makeUuid('33', 102),
    spPolo3: makeUuid('33', 103),
    spPolo4: makeUuid('33', 104),
    spPolo5: makeUuid('33', 105),

    spOffice1: makeUuid('33', 201),
    spOffice2: makeUuid('33', 202),
    spOffice3: makeUuid('33', 203),
    spOffice4: makeUuid('33', 204),
    spOffice5: makeUuid('33', 205),

    spBaoHo1: makeUuid('33', 301),
    spBaoHo2: makeUuid('33', 302),
    spBaoHo3: makeUuid('33', 303),
    spBaoHo4: makeUuid('33', 304),
    spBaoHo5: makeUuid('33', 305),
};

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const IMAGE_SETS = {
    polo: [aoPolo1, aoPolo2, aoPolo3, aoPolo4],
    thun: [aoThun1, aoThun2, aoThun3, aoThun4],
    soMiTrang: [aoSoMi1, aoSoMi2, aoSoMi3, aoSoMi4],
    soMiXanh: [aoSoMi11, aoSoMi12, aoSoMi13, aoSoMi14],
    baoHo: [aoBaoHo1, aoBaoHo2, aoBaoHo3, aoBaoHo4],
};

export const danh_muc_san_pham = [
    {
        danh_muc_id: IDs.dmRootCompany,
        ten_danh_muc: "Áo đồng phục công ty",
        slug: "ao-dong-phuc-cong-ty",
        mo_ta: "Các mẫu đồng phục công ty: polo, thun, sơ mi...",
        parent_id: null,
        // hinh_anh: "https://example.com/images/categories/cong-ty.jpg",
        hinh_anh: { icon: 'Shirt', size: 48, color: '#333' },
        thu_tu: 1,
        trang_thai: true,
    },
    {
        danh_muc_id: IDs.dmPolo,
        ten_danh_muc: "Áo polo đồng phục",
        slug: "ao-polo-dong-phuc",
        mo_ta: "Áo polo dành cho doanh nghiệp.",
        parent_id: IDs.dmRootCompany,
        hinh_anh: iconDmAoPolo,
        thu_tu: 2,
        trang_thai: true,
    },
    {
        danh_muc_id: IDs.dmThun,
        ten_danh_muc: "Áo thun đồng phục",
        slug: "ao-thun-dong-phuc",
        mo_ta: "Áo thun dành cho doanh nghiệp.",
        parent_id: IDs.dmRootCompany,
        hinh_anh: iconDmAoThun,
        thu_tu: 3,
        trang_thai: true,
    },
    {
        danh_muc_id: IDs.dmOffice,
        ten_danh_muc: "Đồng phục công sở",
        slug: "dong-phuc-cong-so",
        mo_ta: "Sơ mi, quần âu, vest...",
        parent_id: null,
        hinh_anh: { icon: 'Shirt', size: 48, color: '#333' },
        thu_tu: 4,
        trang_thai: true,
    },
    {
        danh_muc_id: IDs.dmSoMi,
        ten_danh_muc: "Áo sơ mi đồng phục",
        slug: "ao-so-mi-dong-phuc",
        mo_ta: "Áo sơ mi dành cho doanh nghiệp.",
        parent_id: IDs.dmOffice,
        hinh_anh: iconDmAoSoMi,
        thu_tu: 5,
        trang_thai: true,
    },
    {
        danh_muc_id: IDs.dmBaoHo,
        ten_danh_muc: "Đồng phục bảo hộ",
        slug: "dong-phuc-bao-ho",
        mo_ta: "Đồng phục bảo hộ...",
        parent_id: null,
        hinh_anh: iconDMAoBaoHo,
        thu_tu: 6,
        trang_thai: true,
    },
];

// export const nguoi_dung = [
//     {
//         nguoi_dung_id: IDs.userAdmin,
//         ten: "Admin Minh Anh",
//         email: "admin@minhanh.local",
//         mat_khau: "$2b$10$mocked_hash_do_not_use",
//         so_dien_thoai: "0901234567",
//         anh_dai_dien: "https://example.com/images/users/admin.jpg",
//         gioi_tinh: "other",
//         ngay_sinh: "1995-01-01",
//         dia_chi: "Hà Nội",
//         vai_tro: "admin",
//         ngay_tao: now,
//         trang_thai: true,
//         reset_token: null,
//         reset_token_expire: null,
//     },
//     {
//         nguoi_dung_id: IDs.userCustomer,
//         ten: "Nguyễn Văn A",
//         email: "customer@minhanh.local",
//         mat_khau: "$2b$10$mocked_hash_do_not_use",
//         so_dien_thoai: "0886268268",
//         anh_dai_dien: "https://example.com/images/users/customer.jpg",
//         gioi_tinh: "male",
//         ngay_sinh: "2000-06-15",
//         dia_chi: "TP. Hồ Chí Minh",
//         vai_tro: "customer",
//         ngay_tao: now,
//         trang_thai: true,
//         reset_token: null,
//         reset_token_expire: null,
//     },
// ];

export const san_pham = [
    // Áo đồng phục công ty (5 sản phẩm) — tạm dùng lại 4 ảnh cũ (Aircool)
    {
        san_pham_id: IDs.spRootCompany1,
        ten_san_pham: "Áo Thun Đồng Phục Công Ty Aircool Chuyển Nhiệt TH True Milk [Hot]",
        slug: "ao-thun-dong-phuc-cong-ty-aircool-chuyen-nhiet-th-true-milk-hot",
        mo_ta: "Áo thun đồng phục chất liệu thoáng mát, form đứng.",
        meta_title: "Áo Thun Đồng Phục - Aircool",
        meta_description: "Áo thun đồng phục Aircool chuyển nhiệt TH True Milk, chất liệu thoáng mát.",
        gia_tham_khao: 180000,
        gia_ban: 160000,
        gia_khuyen_mai: 150000,
        so_luong_ton: 120,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cotton 65/35",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "thun,cong-ty,thoang-mat",
        views: 1200,
        luot_mua: 67,
        sp_noi_bat: true,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmThun,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spRootCompany2,
        ten_san_pham: "Áo Thun Đồng Phục Công Ty Aircool - Mẫu 02",
        slug: "ao-thun-dong-phuc-cong-ty-aircool-mau-02",
        mo_ta: "Áo thun đồng phục chất liệu thoáng mát, dễ phối.",
        meta_title: "Áo Thun Đồng Phục - Aircool",
        meta_description: "Áo thun đồng phục Aircool (mẫu 02), chất liệu thoáng mát.",
        gia_tham_khao: 175000,
        gia_ban: 155000,
        gia_khuyen_mai: 145000,
        so_luong_ton: 100,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cotton 65/35",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "thun,cong-ty",
        views: 320,
        luot_mua: 12,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmThun,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spRootCompany3,
        ten_san_pham: "Áo Thun Đồng Phục Công Ty Aircool - Cổ Tròn",
        slug: "ao-thun-dong-phuc-cong-ty-aircool-co-tron",
        mo_ta: "Áo thun cổ tròn, form đứng, phù hợp in/thêu logo.",
        meta_title: "Áo Thun Đồng Phục - Aircool",
        meta_description: "Áo thun đồng phục Aircool cổ tròn, form đứng.",
        gia_tham_khao: 170000,
        gia_ban: 150000,
        gia_khuyen_mai: null,
        so_luong_ton: 90,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cotton 100%",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "thun,cong-ty,co-tron",
        views: 210,
        luot_mua: 8,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmThun,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spRootCompany4,
        ten_san_pham: "Áo Thun Đồng Phục Công Ty Aircool - Tay Raglan",
        slug: "ao-thun-dong-phuc-cong-ty-aircool-tay-raglan",
        mo_ta: "Áo thun tay raglan trẻ trung, thoáng mát.",
        meta_title: "Áo Thun Đồng Phục - Aircool",
        meta_description: "Áo thun đồng phục Aircool tay raglan, thoáng mát.",
        gia_tham_khao: 185000,
        gia_ban: 165000,
        gia_khuyen_mai: 155000,
        so_luong_ton: 85,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cotton 65/35",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "thun,cong-ty,ranglan",
        views: 140,
        luot_mua: 6,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmThun,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spRootCompany5,
        ten_san_pham: "Áo Thun Đồng Phục Công Ty Aircool - Form Oversize",
        slug: "ao-thun-dong-phuc-cong-ty-aircool-oversize",
        mo_ta: "Áo thun form rộng, phù hợp team-building.",
        meta_title: "Áo Thun Đồng Phục - Aircool",
        meta_description: "Áo thun đồng phục Aircool form oversize cho team-building.",
        gia_tham_khao: 190000,
        gia_ban: 170000,
        gia_khuyen_mai: null,
        so_luong_ton: 75,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cotton 100%",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "thun,cong-ty,oversize",
        views: 95,
        luot_mua: 4,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmThun,
        ngay_tao: now,
    },

    // Áo polo đồng phục (5 sản phẩm) — dùng lại 4 ảnh cũ (Coolmate)
    {
        san_pham_id: IDs.spPolo1,
        ten_san_pham: "Áo Polo Đồng Phục Công Ty Coolmate 2 Màu Nâu",
        slug: "ao-polo-dong-phuc-cong-ty-coolmate-2-mau-nau",
        mo_ta: "Áo polo đồng phục, form đứng, phù hợp doanh nghiệp.",
        meta_title: "Áo Polo Đồng Phục - Coolmate",
        meta_description: "Áo polo đồng phục Coolmate 2 màu nâu.",
        gia_tham_khao: 220000,
        gia_ban: 210000,
        gia_khuyen_mai: null,
        so_luong_ton: 90,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cá sấu poly",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "polo,cong-ty",
        views: 530,
        luot_mua: 20,
        sp_noi_bat: true,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmPolo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spPolo2,
        ten_san_pham: "Áo Polo Đồng Phục Công Ty Coolmate - Mẫu 02",
        slug: "ao-polo-dong-phuc-cong-ty-coolmate-mau-02",
        mo_ta: "Áo polo đồng phục, dễ phối, phù hợp thêu logo.",
        meta_title: "Áo Polo Đồng Phục - Coolmate",
        meta_description: "Áo polo đồng phục Coolmate (mẫu 02).",
        gia_tham_khao: 225000,
        gia_ban: 215000,
        gia_khuyen_mai: 205000,
        so_luong_ton: 85,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cá sấu poly",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "polo,cong-ty",
        views: 180,
        luot_mua: 7,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmPolo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spPolo3,
        ten_san_pham: "Áo Polo Đồng Phục Công Ty Coolmate - Phối Bo Cổ",
        slug: "ao-polo-dong-phuc-cong-ty-coolmate-phoi-bo-co",
        mo_ta: "Áo polo phối bo cổ, lịch sự.",
        meta_title: "Áo Polo Đồng Phục - Coolmate",
        meta_description: "Áo polo đồng phục Coolmate phối bo cổ.",
        gia_tham_khao: 230000,
        gia_ban: 220000,
        gia_khuyen_mai: null,
        so_luong_ton: 80,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cá sấu cotton",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "polo,cong-ty,lich-su",
        views: 150,
        luot_mua: 5,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmPolo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spPolo4,
        ten_san_pham: "Áo Polo Đồng Phục Công Ty Coolmate - Thêu Logo",
        slug: "ao-polo-dong-phuc-cong-ty-coolmate-theu-logo",
        mo_ta: "Áo polo phù hợp thêu logo sắc nét.",
        meta_title: "Áo Polo Đồng Phục - Coolmate",
        meta_description: "Áo polo đồng phục Coolmate tối ưu cho thêu logo.",
        gia_tham_khao: 235000,
        gia_ban: 225000,
        gia_khuyen_mai: 215000,
        so_luong_ton: 70,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cá sấu poly",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "polo,cong-ty,theu",
        views: 110,
        luot_mua: 4,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmPolo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spPolo5,
        ten_san_pham: "Áo Polo Đồng Phục Công Ty Coolmate - Vải Cá Sấu",
        slug: "ao-polo-dong-phuc-cong-ty-coolmate-vai-ca-sau",
        mo_ta: "Áo polo vải cá sấu thoáng mát, bền form.",
        meta_title: "Áo Polo Đồng Phục - Coolmate",
        meta_description: "Áo polo đồng phục Coolmate vải cá sấu thoáng mát.",
        gia_tham_khao: 240000,
        gia_ban: 230000,
        gia_khuyen_mai: null,
        so_luong_ton: 65,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Cá sấu cotton",
        bao_quan: "Giặt nhẹ, tránh tẩy mạnh.",
        tags: "polo,cong-ty,ca-sau",
        views: 90,
        luot_mua: 3,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmPolo,
        ngay_tao: now,
    },

    // Đồng phục công sở (5 sản phẩm) — sơ mi: dùng lại 4 ảnh cũ theo dòng (Vinfast/BYD)
    {
        san_pham_id: IDs.spOffice1,
        ten_san_pham: "Đồng Phục Áo Sơ Mi Dài Tay Màu Trắng Vinfast [Hot]",
        slug: "ao-so-mi-cong-so-minh-anh-trang",
        mo_ta: "Sơ mi công sở lịch sự, phù hợp văn phòng.",
        meta_title: "Áo Sơ Mi Công Sở - Minh Anh",
        meta_description: "Sơ mi công sở Minh Anh màu trắng.",
        gia_tham_khao: 220000,
        gia_ban: 210000,
        gia_khuyen_mai: null,
        so_luong_ton: 80,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kate silk",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "so-mi,cong-so",
        views: 530,
        luot_mua: 20,
        sp_noi_bat: true,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmSoMi,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spOffice2,
        ten_san_pham: "Đồng Phục Áo Sơ Mi Dài Tay Màu Xanh Phối Trắng BYD",
        slug: "ao-so-mi-cong-so-minh-anh-xanh-phoi-trang",
        mo_ta: "Sơ mi công sở lịch sự, phù hợp văn phòng.",
        meta_title: "Áo Sơ Mi Công Sở - Minh Anh",
        meta_description: "Sơ mi công sở Minh Anh phối xanh - trắng.",
        gia_tham_khao: 220000,
        gia_ban: 210000,
        gia_khuyen_mai: null,
        so_luong_ton: 80,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kate silk",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "so-mi,cong-so",
        views: 530,
        luot_mua: 20,
        sp_noi_bat: true,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmSoMi,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spOffice3,
        ten_san_pham: "Đồng Phục Áo Sơ Mi Dài Tay Màu Trắng Vinfast - Mẫu 02",
        slug: "ao-so-mi-cong-so-minh-anh-trang-mau-02",
        mo_ta: "Sơ mi công sở lịch sự, chất liệu thoáng.",
        meta_title: "Áo Sơ Mi Công Sở - Minh Anh",
        meta_description: "Sơ mi công sở Minh Anh màu trắng (mẫu 02).",
        gia_tham_khao: 225000,
        gia_ban: 215000,
        gia_khuyen_mai: null,
        so_luong_ton: 70,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kate silk",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "so-mi,cong-so",
        views: 120,
        luot_mua: 6,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmSoMi,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spOffice4,
        ten_san_pham: "Đồng Phục Áo Sơ Mi Dài Tay Màu Trắng Vinfast - Mẫu 03",
        slug: "ao-so-mi-cong-so-minh-anh-trang-mau-03",
        mo_ta: "Sơ mi công sở lịch sự, dễ phối quần âu.",
        meta_title: "Áo Sơ Mi Công Sở - Minh Anh",
        meta_description: "Sơ mi công sở Minh Anh màu trắng (mẫu 03).",
        gia_tham_khao: 230000,
        gia_ban: 220000,
        gia_khuyen_mai: 210000,
        so_luong_ton: 65,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kate silk",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "so-mi,cong-so",
        views: 95,
        luot_mua: 4,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmSoMi,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spOffice5,
        ten_san_pham: "Đồng Phục Áo Sơ Mi Dài Tay Màu Xanh Phối Trắng BYD - Mẫu 02",
        slug: "ao-so-mi-cong-so-minh-anh-xanh-phoi-trang-mau-02",
        mo_ta: "Sơ mi công sở lịch sự, phù hợp văn phòng.",
        meta_title: "Áo Sơ Mi Công Sở - Minh Anh",
        meta_description: "Sơ mi công sở Minh Anh phối xanh - trắng (mẫu 02).",
        gia_tham_khao: 225000,
        gia_ban: 215000,
        gia_khuyen_mai: null,
        so_luong_ton: 60,
        don_vi_tinh: "cái",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kate silk",
        bao_quan: "Ủi mặt trái, giặt nước mát.",
        tags: "so-mi,cong-so",
        views: 80,
        luot_mua: 3,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmSoMi,
        ngay_tao: now,
    },

    // Đồng phục bảo hộ (5 sản phẩm)
    {
        san_pham_id: IDs.spBaoHo1,
        ten_san_pham: "Quần Áo Bảo Hộ Lao Động Kaki - 01",
        slug: "quan-ao-bao-ho-lao-dong-kaki-01",
        mo_ta: "Quần áo bảo hộ lao động vải kaki bền đẹp, thoáng mát.",
        meta_title: "Quần Áo Bảo Hộ Lao Động - Minh Anh",
        meta_description: "Quần áo bảo hộ lao động vải kaki bền đẹp, thoáng mát.",
        gia_tham_khao: 250000,
        gia_ban: 230000,
        gia_khuyen_mai: 210000,
        so_luong_ton: 150,
        don_vi_tinh: "bộ",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kaki Nam Định",
        bao_quan: "Giặt sấy bình thường.",
        tags: "bao-ho,kaki",
        views: 450,
        luot_mua: 35,
        sp_noi_bat: true,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmBaoHo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spBaoHo2,
        ten_san_pham: "Quần Áo Bảo Hộ Lao Động Kaki - 02",
        slug: "quan-ao-bao-ho-lao-dong-kaki-02",
        mo_ta: "Quần áo bảo hộ lao động vải kaki bền đẹp, nhiều túi tiện dụng.",
        meta_title: "Quần Áo Bảo Hộ Lao Động - Minh Anh",
        meta_description: "Quần áo bảo hộ lao động vải kaki bền đẹp.",
        gia_tham_khao: 250000,
        gia_ban: 230000,
        gia_khuyen_mai: null,
        so_luong_ton: 120,
        don_vi_tinh: "bộ",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kaki Nam Định",
        bao_quan: "Giặt sấy bình thường.",
        tags: "bao-ho,kaki",
        views: 230,
        luot_mua: 15,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmBaoHo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spBaoHo3,
        ten_san_pham: "Quần Áo Bảo Hộ Lao Động Kaki Phản Quang",
        slug: "quan-ao-bao-ho-lao-dong-kaki-phan-quang",
        mo_ta: "Quần áo bảo hộ lao động có dây phản quang an toàn.",
        meta_title: "Quần Áo Bảo Hộ Phản Quang",
        meta_description: "Quần áo bảo hộ kèm dây phản quang an toàn.",
        gia_tham_khao: 280000,
        gia_ban: 260000,
        gia_khuyen_mai: 250000,
        so_luong_ton: 90,
        don_vi_tinh: "bộ",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kaki Pangrim",
        bao_quan: "Giặt sấy bình thường.",
        tags: "bao-ho,phan-quang",
        views: 180,
        luot_mua: 10,
        sp_noi_bat: false,
        sp_moi: true,
        trang_thai: "active",
        danh_muc_id: IDs.dmBaoHo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spBaoHo4,
        ten_san_pham: "Quần Áo Bảo Hộ Lao Động Vải Pangrim",
        slug: "quan-ao-bao-ho-lao-dong-vai-pangrim",
        mo_ta: "Quần áo bảo hộ lao động cao cấp, không nhăn, không phai màu.",
        meta_title: "Quần Áo Bảo Hộ Pangrim",
        meta_description: "Quần áo bảo hộ lao động vải Pangrim cao cấp.",
        gia_tham_khao: 350000,
        gia_ban: 320000,
        gia_khuyen_mai: null,
        so_luong_ton: 60,
        don_vi_tinh: "bộ",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Pangrim Hàn Quốc",
        bao_quan: "Giặt sấy nhẹ.",
        tags: "bao-ho,pangrim",
        views: 310,
        luot_mua: 20,
        sp_noi_bat: true,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmBaoHo,
        ngay_tao: now,
    },
    {
        san_pham_id: IDs.spBaoHo5,
        ten_san_pham: "Quần Áo Bảo Hộ Lao Động Kaki - Ghi Bạc",
        slug: "quan-ao-bao-ho-lao-dong-kaki-ghi-xam",
        mo_ta: "Quần áo bảo hộ kaki màu ghi xám sạch sẽ.",
        meta_title: "Quần Áo Bảo Hộ Kaki Ghi Xám",
        meta_description: "Quần áo bảo hộ kaki màu ghi xám phù hợp công trường.",
        gia_tham_khao: 240000,
        gia_ban: 220000,
        gia_khuyen_mai: 200000,
        so_luong_ton: 100,
        don_vi_tinh: "bộ",
        thuong_hieu: "Minh Anh",
        xuat_xu: "Việt Nam",
        chat_lieu: "Kaki Nam Định",
        bao_quan: "Giặt sấy bình thường.",
        tags: "bao-ho,kaki",
        views: 120,
        luot_mua: 8,
        sp_noi_bat: false,
        sp_moi: false,
        trang_thai: "active",
        danh_muc_id: IDs.dmBaoHo,
        ngay_tao: now,
    },
];

export const bien_the_san_pham = [
    // Mỗi sản phẩm có đủ 5 size: S, M, L, XL, XXL
    ...(() => {
        const mauSacBySanPhamId = new Map([
            // Root company (thun)
            [IDs.spRootCompany1, 'Trắng'],
            [IDs.spRootCompany2, 'Trắng'],
            [IDs.spRootCompany3, 'Trắng'],
            [IDs.spRootCompany4, 'Trắng'],
            [IDs.spRootCompany5, 'Trắng'],

            // Polo
            [IDs.spPolo1, 'Nâu'],
            [IDs.spPolo2, 'Nâu'],
            [IDs.spPolo3, 'Nâu'],
            [IDs.spPolo4, 'Nâu'],
            [IDs.spPolo5, 'Nâu'],

            // Office
            [IDs.spOffice1, 'Trắng'],
            [IDs.spOffice3, 'Trắng'],
            [IDs.spOffice4, 'Trắng'],
            [IDs.spOffice2, 'Xanh'],
            [IDs.spOffice5, 'Xanh'],

            // Bảo hộ
            [IDs.spBaoHo1, 'Ghi đậm'],
            [IDs.spBaoHo2, 'Ghi Bạc'],
            [IDs.spBaoHo3, 'Phản quang'],
            [IDs.spBaoHo4, 'Xanh phối xám'],
            [IDs.spBaoHo5, 'Ghi Bạc'],
        ]);

        let variantIndex = 1;
        return san_pham.flatMap((sp) => {
            const mau_sac = mauSacBySanPhamId.get(sp.san_pham_id) ?? 'Mặc định';
            const gia = sp.gia_khuyen_mai ?? sp.gia_ban ?? sp.gia_tham_khao ?? 0;
            const baseStock = sp.so_luong_ton ?? 0;
            const stockPerSize = baseStock ? Math.max(1, Math.floor(baseStock / SIZES.length)) : 0;

            return SIZES.map((size) => ({
                bien_the_id: makeUuid('44', variantIndex++),
                san_pham_id: sp.san_pham_id,
                mau_sac,
                size,
                gia,
                so_luong: stockPerSize,
            }));
        });
    })(),
];

export const hinh_anh_san_pham = [
    // Ảnh sản phẩm: tái sử dụng ảnh cũ (mỗi sản phẩm 4 ảnh hiện có)
    ...(() => {
        const imageSetBySanPhamId = new Map([
            // Root company (thun)
            [IDs.spRootCompany1, IMAGE_SETS.thun],
            [IDs.spRootCompany2, IMAGE_SETS.thun],
            [IDs.spRootCompany3, IMAGE_SETS.thun],
            [IDs.spRootCompany4, IMAGE_SETS.thun],
            [IDs.spRootCompany5, IMAGE_SETS.thun],

            // Polo
            [IDs.spPolo1, IMAGE_SETS.polo],
            [IDs.spPolo2, IMAGE_SETS.polo],
            [IDs.spPolo3, IMAGE_SETS.polo],
            [IDs.spPolo4, IMAGE_SETS.polo],
            [IDs.spPolo5, IMAGE_SETS.polo],

            // Office
            [IDs.spOffice1, IMAGE_SETS.soMiTrang],
            [IDs.spOffice3, IMAGE_SETS.soMiTrang],
            [IDs.spOffice4, IMAGE_SETS.soMiTrang],
            [IDs.spOffice2, IMAGE_SETS.soMiXanh],
            [IDs.spOffice5, IMAGE_SETS.soMiXanh],

            // Bảo hộ
            [IDs.spBaoHo1, IMAGE_SETS.baoHo],
            [IDs.spBaoHo2, IMAGE_SETS.baoHo],
            [IDs.spBaoHo3, IMAGE_SETS.baoHo],
            [IDs.spBaoHo4, IMAGE_SETS.baoHo],
            [IDs.spBaoHo5, IMAGE_SETS.baoHo],
        ]);

        let imageIndex = 1;
        return san_pham.flatMap((sp) => {
            const urls = imageSetBySanPhamId.get(sp.san_pham_id) ?? [];
            return urls.map((url_anh) => ({
                hinh_anh_id: makeUuid('55', imageIndex++),
                san_pham_id: sp.san_pham_id,
                url_anh,
            }));
        });
    })(),
];

// export const danh_muc_bai_viet = [
//     {
//         danh_muc_bai_viet_id: IDs.dmbvNews,
//         ten_danh_muc: "Tin tức",
//         slug: "tin-tuc",
//         mo_ta: "Các bài viết cập nhật hoạt động và sản phẩm.",
//         parent_id: null,
//     },
//     {
//         danh_muc_bai_viet_id: IDs.dmbvRecruit,
//         ten_danh_muc: "Tuyển dụng",
//         slug: "tuyen-dung",
//         mo_ta: "Tin tuyển dụng mới nhất.",
//         parent_id: null,
//     },
// ];

// export const bai_viet = [
//     {
//         bai_viet_id: IDs.bvIntro,
//         tieu_de: "Minh Anh Uniform – Đồng phục cao cấp",
//         slug: "minh-anh-uniform-dong-phuc-cao-cap",
//         noi_dung: "<p>Nội dung mẫu bài viết giới thiệu.</p>",
//         tom_tat: "Giới thiệu nhanh về Minh Anh Uniform.",
//         anh_dai_dien: "https://example.com/images/posts/intro.jpg",
//         views: 120,
//         tags: "gioi-thieu,thuong-hieu",
//         trang_thai: "published",
//         danh_muc_bai_viet_id: IDs.dmbvNews,
//         nguoi_dung_id: IDs.userAdmin,
//         ngay_dang: now,
//     },
//     {
//         bai_viet_id: IDs.bvRecruit,
//         tieu_de: "Tuyển dụng: Nhân viên kinh doanh",
//         slug: "tuyen-dung-nhan-vien-kinh-doanh",
//         noi_dung: "<p>Mô tả công việc, yêu cầu, quyền lợi (mẫu).</p>",
//         tom_tat: "Thông tin tuyển dụng nhân viên kinh doanh.",
//         anh_dai_dien: "https://example.com/images/posts/recruit.jpg",
//         views: 45,
//         tags: "tuyen-dung,nhan-su",
//         trang_thai: "published",
//         danh_muc_bai_viet_id: IDs.dmbvRecruit,
//         nguoi_dung_id: IDs.userAdmin,
//         ngay_dang: now,
//     },
// ];

// export const hinh_anh_bai_viet = [
//     {
//         hinh_anh_id: IDs.habvIntro1,
//         bai_viet_id: IDs.bvIntro,
//         url_anh: "https://example.com/images/posts/intro-gallery-1.jpg",
//     },
// ];

// export const yeu_cau_tu_van = [
//     {
//         yeu_cau_id: IDs.yctv1,
//         ten_khach: "Trần Thị B",
//         so_dien_thoai: "0911222333",
//         email: "ttb@example.com",
//         noi_dung: "Mình muốn tư vấn đặt áo polo số lượng 50, in logo công ty.",
//         san_pham_id: IDs.spPoloA,
//         ngay_gui: now,
//         da_xu_ly: false,
//         ghi_chu_noi_bo: "",
//     },
// ];

// export const slide = [
//     {
//         slide_id: IDs.slide1,
//         tieu_de: "Bộ sưu tập đồng phục 2026",
//         mo_ta: "Thiết kế hiện đại, chất liệu cao cấp.",
//         url_hinh: "https://example.com/images/slides/slide-1.jpg",
//         link: "/san-pham",
//         thu_tu: 1,
//         trang_thai: true,
//     },
//     {
//         slide_id: IDs.slide2,
//         tieu_de: "Ưu đãi đơn hàng doanh nghiệp",
//         mo_ta: "Giảm giá theo số lượng.",
//         url_hinh: "https://example.com/images/slides/slide-2.jpg",
//         link: "/lien-he",
//         thu_tu: 2,
//         trang_thai: true,
//     },
// ];

// export const faq = [
//     {
//         faq_id: IDs.faq1,
//         cau_hoi: "Thời gian sản xuất đồng phục mất bao lâu?",
//         tra_loi: "Tùy số lượng và chất liệu, thường 7–14 ngày (mẫu).",
//         thu_tu: 1,
//         trang_thai: true,
//     },
//     {
//         faq_id: IDs.faq2,
//         cau_hoi: "Có hỗ trợ in/thêu logo không?",
//         tra_loi: "Có. Chúng tôi hỗ trợ in/thêu theo yêu cầu (mẫu).",
//         thu_tu: 2,
//         trang_thai: true,
//     },
// ];

export const lien_he = [
    {
        lien_he_id: IDs.lh1,
        ho_ten: "Lê Văn C",
        email: "lvc@example.com",
        so_dien_thoai: "0988777666",
        tieu_de: "Yêu cầu báo giá",
        noi_dung: "Báo giá đồng phục công sở số lượng 30.",
        ngay_gui: now,
        da_xu_ly: false,
    },
];

// Company contact info (used by UI: Contact page)
export const thong_tin_lien_he = {
    thuong_hieu: 'Minh Anh Uniform',
    hotline: '0886268268',
    hotline_hien_thi: '0886 268 268',
    email: 'kinhdoanh@dpha.vn',
    gio_lam_viec: '8h00 - 21h00',
    tu_van_vien: 'Ms Quỳnh',
    he_thong_showroom: [
        '268 Nguyễn Huy Tưởng, Phường Thanh Xuân, TP. Hà Nội',
        '110 Trường Chinh, Phường Kim Liên, TP. Hà Nội',
        '307 Cầu Giấy, Phường Cầu Giấy, TP. Hà Nội',
        '757 Cách Mạng Tháng 8, Phường Tân Hòa, TP. Hồ Chí Minh',
    ],
    xuong_san_xuat: [
        'Thôn Phú Hữu, Xã Tiến Thắng, TP. Hà Nội',
        'Khu Hoàng Xá, Xã Hoàng Cương, Tỉnh Phú Thọ',
    ],
};

// Other tables are currently unused by the UI; keep them defined to avoid runtime ReferenceError.
export const nguoi_dung = [];
export const danh_muc_bai_viet = [];
export const bai_viet = [];
export const hinh_anh_bai_viet = [];
export const yeu_cau_tu_van = [];
export const slide = [];
export const faq = [];

// Convenience export: one object with table-like keys.
export const dataset = {
    danh_muc_san_pham,
    nguoi_dung,
    san_pham,
    bien_the_san_pham,
    hinh_anh_san_pham,
    danh_muc_bai_viet,
    bai_viet,
    hinh_anh_bai_viet,
    yeu_cau_tu_van,
    slide,
    faq,
    lien_he,
    thong_tin_lien_he,
};

export default dataset;
