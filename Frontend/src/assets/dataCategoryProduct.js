// src/data/dataCategoryProduct.js
export const categories = [
    {
        id: 1,
        label: "TRANG CHỦ",
        href: "/",
        hasSubmenu: false,
    },
    {
        id: 2,
        label: "GIỚI THIỆU",
        href: "/gioi-thieu",
        hasSubmenu: false,
    },
    {
        id: 3,
        label: "SẢN PHẨM",
        href: "/san-pham",
        hasSubmenu: true,
        submenu: [
            { label: "Áo polo đồng phục", href: "/ao-polo" },
            { label: "Áo thun đồng phục cổ tròn", href: "/ao-thun-co-tron" },
            { label: "Áo sơ mi đồng phục", href: "/ao-so-mi" },
            { label: "Quần âu công sở", href: "/quan-au" },
            { label: "Chân váy công sở", href: "/chan-vay" },
            { label: "Áo khoác đồng phục", href: "/ao-khoac" },
        ],
    },
    {
        id: 4,
        label: "ĐỒNG PHỤC MAY SẴN",
        href: "/dong-phuc-may-san",
        hasSubmenu: true,
        submenu: [
            { label: "Đồng phục mầm non", href: "/mam-non" },
            { label: "Đồng phục học lớp", href: "/hoc-lop" },
            { label: "Bảo hộ lao động", href: "/bao-ho-lao-dong" },
            { label: "Đồng phục khác", href: "/khac" },
        ],
    },

    {
        id: 5,
        label: "LIÊN HỆ",
        href: "/lien-he",
        hasSubmenu: false,
    },
    {
        id: 6,
        label: "TIN TỨC",
        href: "/tin-tuc",
        hasSubmenu: true,
    },
];