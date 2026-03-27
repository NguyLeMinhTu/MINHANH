import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight, Phone } from 'lucide-react';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // Map dữ liệu từ backend DTO hoặc dữ liệu mẫu
    const title = product?.tenSanPham || product?.name || product?.title || 'Sản phẩm';
    const priceFrom = product?.giaBan || product?.priceFrom || product?.price || 0;
    const priceDiscount = product?.giaKhuyenMai || null;
    
    // Ảnh đại diện: ưu tiên anhDaiDien từ backend, sau đó là mảng images
    const image1 = product?.anhDaiDien || product?.images?.[0] || product?.image || null;
    const image2 = product?.images?.[1] || null;
    
    // Các nhãn trạng thái
    const isNew = product?.spMoi || product?.isNew;
    const isHot = Boolean(product?.spNoiBat || product?.isHot || product?.isFeatured || product?.featured);
    
    // Danh mục hiển thị
    const category = product?.danhMucTen || product?.subCategory || product?.category || null;

    // Định dạng giá tiền Việt Nam
    const formattedPrice = Number(priceFrom).toLocaleString('vi-VN');
    const formattedDiscount = priceDiscount ? Number(priceDiscount).toLocaleString('vi-VN') : null;

    return (
        <article
            itemScope
            itemType="https://schema.org/Product"
            className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-[0_2px_10px_-3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] ring-1 ring-carbon-black-100/60 hover:ring-brown-bark-400/30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer translate-y-0 hover:-translate-y-1"
            onClick={() => product?.id && navigate(`/san-pham/${product.id}`)}
        >
            <meta itemProp="url" content={`/san-pham/${product?.id}`} />

            {/* Image Wrapper */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-carbon-black-50/50">
                {image1 ? (
                    <>
                        {/* Ảnh chính (Primary) */}
                        <img
                            src={image1}
                            alt={title}
                            itemProp="image"
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${image2 ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                            loading="lazy"
                        />
                        {/* Ảnh thứ 2 (Secondary) - Hiện khi hover */}
                        {image2 && (
                            <img
                                src={image2}
                                alt={`${title} - 2`}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105 scale-110"
                                loading="lazy"
                            />
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-carbon-black-200 bg-carbon-black-50/30">
                        <ImageIcon className="w-12 h-12 stroke-1" />
                    </div>
                )}

                {/* Badges */}
                {(isNew || isHot) && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 inline">
                        {isNew && (
                            <span className="bg-brown-bark-800 text-golden-earth-50 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm mr-1">
                                Mới
                            </span>
                        )}
                        {isHot && (
                            <span className="bg-gradient-to-r from-golden-earth-100 to-golden-earth-50 text-brown-bark-800 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm ring-1 ring-brown-bark-800/10">
                                Hot
                            </span>
                        )}
                    </div>
                )}

                {/* Subtle Gradient Scrim at Bottom for image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-black-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover Action Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 pt-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 flex gap-1.5 sm:gap-2">
                    <span className="flex-1 flex items-center justify-center gap-1 w-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-xl bg-white/95 backdrop-blur-sm text-brown-bark-800 py-2 sm:py-2.5 shadow-lg border border-white/20 transition-colors">
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </span>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = 'tel:0901234567';
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 w-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-xl bg-brown-bark-800/95 backdrop-blur-sm text-golden-earth-50 py-2 sm:py-2.5 shadow-lg border border-brown-bark-800/50 hover:bg-brown-bark-900 transition-colors"
                    >
                        <Phone className="w-3 h-3" strokeWidth={2.5} />
                        <span>Tư vấn</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col flex-1 bg-white">
                <meta itemProp="name" content={title} />
                {category && <meta itemProp="category" content={category} />}

                {category && (
                    <div className="mb-2">
                        <span className="inline-flex items-center max-w-full px-2.5 py-1 rounded-md bg-golden-earth-50/70 text-[10px] font-bold text-brown-bark-600 ring-1 ring-inset ring-brown-bark-900/10 truncate transition-colors group-hover:bg-golden-earth-50">
                            {category}
                        </span>
                    </div>
                )}

                <h3
                    itemProp="name"
                    className="text-[14px] font-semibold text-carbon-black-900 leading-snug line-clamp-2 mb-3 min-h-[2.5rem] group-hover:text-brown-bark-700 transition-colors"
                    title={title}
                >
                    {title}
                </h3>

                <div className="mt-auto flex items-end justify-between gap-2">
                    <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="flex flex-col">
                        <meta itemProp="priceCurrency" content="VND" />
                        <meta itemProp="price" content={String(priceFrom)} />
                        <span className="text-[10px] text-carbon-black-500 uppercase tracking-wide font-medium mb-0.5">Giá từ</span>
                        <div className="flex flex-col justify-end min-h-[3.2rem]">
                            {formattedDiscount ? (
                                <span className="text-xs text-carbon-black-400 line-through tabular-nums decoration-brown-bark-300/50">
                                    {formattedPrice}đ
                                </span>
                            ) : (
                                <span className="text-xs opacity-0 pointer-events-none select-none">
                                    {formattedPrice}đ
                                </span>
                            )}
                            <div className="flex items-baseline gap-1">
                                <span className="text-base sm:text-[17px] font-black text-brown-bark-800 tabular-nums tracking-tight">
                                    {formattedDiscount || formattedPrice}
                                </span>
                                <span className="text-sm font-bold text-brown-bark-800/80">đ</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = 'tel:0901234567';
                        }}
                        className="shrink-0 w-9 h-9 rounded-full bg-golden-earth-50 ring-1 ring-inset ring-brown-bark-900/5 flex items-center justify-center text-brown-bark-700 hover:bg-brown-bark-700 hover:text-golden-earth-50 hover:ring-brown-bark-700 transition-all duration-300 group-hover:shadow-md"
                        aria-label="Liên hệ"
                        title="Liên hệ tư vấn"
                    >
                        <Phone className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;