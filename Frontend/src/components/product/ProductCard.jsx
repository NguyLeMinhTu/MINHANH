import React from 'react';

const ProductCard = ({ product }) => {
    const title = product?.name || product?.title || 'Sản phẩm';
    const priceFrom = product?.priceFrom ?? product?.price ?? 150000;
    const image1 = product?.images?.[0] || product?.image || null;
    const image2 = product?.images?.[1] || null;

    const formattedPrice = Number(priceFrom).toLocaleString('vi-VN');

    return (
        <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-150 group">
            {/* Image area: two layered images that crossfade on hover */}
            <div className="relative bg-gray-50">
                <div className="w-full aspect-[3/4] overflow-hidden relative">
                    {image1 ? (
                        <>
                            <img
                                src={image1}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-105"
                            />
                            {image2 && (
                                <img
                                    src={image2}
                                    alt={`${title} - 2`}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 hidden sm:block show-on-hover"
                                />
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                    )}
                </div>
            </div>

            {/* Info area */}
            <div className="p-2 text-start">
                <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{title}</h3>
                <div className='flex flex-row items-start'>
                    <div className="text-xs text-gray-500 mt-1 inline">Giá từ: <span className='inline font-semibold text-sm text-[#af7b51]'>{formattedPrice} đ</span></div>
                </div>

            </div>
        </article>
    );
};

export default ProductCard;