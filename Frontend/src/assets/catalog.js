// Adapter layer: convert DB-like dataset (dataset.js) into UI-friendly product/category shapes
// Used by pages/components that previously depended on assets/dataProduct.js

import {
    danh_muc_san_pham,
    san_pham,
    bien_the_san_pham,
    hinh_anh_san_pham,
} from './dataset'

const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']

const sortByOrder = (a, b) => (a?.thu_tu ?? 0) - (b?.thu_tu ?? 0)

const uniq = (arr) => Array.from(new Set(arr))

const buildCategoryIndex = () => {
    const list = (danh_muc_san_pham || []).filter((dm) => dm && dm.trang_thai !== false)
    const byId = new Map(list.map((dm) => [dm.danh_muc_id, dm]))
    const bySlug = new Map(list.map((dm) => [dm.slug, dm]))

    const byParentId = new Map()
    list.forEach((dm) => {
        const key = dm.parent_id ?? null
        if (!byParentId.has(key)) byParentId.set(key, [])
        byParentId.get(key).push(dm)
    })

    for (const [k, v] of byParentId.entries()) {
        byParentId.set(k, v.slice().sort(sortByOrder))
    }

    return { list, byId, bySlug, byParentId }
}

const buildMediaIndex = () => {
    const imgsByProductId = new Map()
        ; (hinh_anh_san_pham || []).forEach((img) => {
            if (!img?.san_pham_id) return
            if (!imgsByProductId.has(img.san_pham_id)) imgsByProductId.set(img.san_pham_id, [])
            imgsByProductId.get(img.san_pham_id).push(img)
        })

    const variantsByProductId = new Map()
        ; (bien_the_san_pham || []).forEach((bt) => {
            if (!bt?.san_pham_id) return
            if (!variantsByProductId.has(bt.san_pham_id)) variantsByProductId.set(bt.san_pham_id, [])
            variantsByProductId.get(bt.san_pham_id).push(bt)
        })

    return { imgsByProductId, variantsByProductId }
}

const { byId: categoryById, bySlug: categoryBySlug, byParentId: categoriesByParentId } = buildCategoryIndex()
const { imgsByProductId, variantsByProductId } = buildMediaIndex()

export const uiCategories = (categoriesByParentId.get(null) || []).map((parent) => {
    const children = categoriesByParentId.get(parent.danh_muc_id) || []
    return {
        name: parent.ten_danh_muc,
        slug: parent.slug,
        subs: children.map((c) => ({ name: c.ten_danh_muc, slug: c.slug })),
    }
})

export const uiProducts = (san_pham || []).map((sp) => {
    const dm = categoryById.get(sp.danh_muc_id)
    const parent = dm?.parent_id ? categoryById.get(dm.parent_id) : dm
    const child = dm?.parent_id ? dm : null

    const images = (imgsByProductId.get(sp.san_pham_id) || []).map((x) => x.url_anh).filter(Boolean)
    const variants = variantsByProductId.get(sp.san_pham_id) || []

    const sizes = uniq(variants.map((v) => v.size).filter(Boolean)).sort(
        (a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b)
    )

    const price = sp.gia_khuyen_mai ?? sp.gia_ban ?? sp.gia_tham_khao ?? 0
    const color = variants.find((v) => v.mau_sac)?.mau_sac ?? null

    return {
        id: sp.san_pham_id,
        name: sp.ten_san_pham,
        images,
        price,
        priceFrom: price,
        category: parent?.ten_danh_muc ?? dm?.ten_danh_muc ?? 'Khác',
        categorySlug: parent?.slug ?? dm?.slug ?? null,
        subCategory: child?.ten_danh_muc ?? null,
        subCategorySlug: child?.slug ?? null,
        color,
        sizes,
        description: sp.mo_ta ?? '',
        isNew: Boolean(sp.sp_moi),
        isHot: Boolean(sp.sp_noi_bat),
        raw: sp,
    }
})

export const getCategoryBySlug = (slug) => {
    if (!slug) return null
    return categoryBySlug.get(slug) ?? null
}

export const getUiProductById = (id) => {
    if (!id) return null
    const key = String(id)
    return uiProducts.find((p) => String(p.id) === key) ?? null
}
