import React from 'react'
import cauhoi1 from '../../../assets/QvA/cau-hoi-thuong-gap1.jpg'
import cauhoi2 from '../../../assets/QvA/cau-hoi-thuong-gap2.jpg'
import cauhoi3 from '../../../assets/QvA/cau-hoi-thuong-gap3.jpg'
import cauhoi4 from '../../../assets/QvA/cau-hoi-thuong-gap4.jpg'
import cauhoi5 from '../../../assets/QvA/cau-hoi-thuong-gap5.jpg'
import cauhoi6 from '../../../assets/QvA/cau-hoi-thuong-gap6.jpg'

import Title from '../../common/Title'



const CauHoiThuongGap = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12 text-gray-800">
            {/* Block 1 header + intro */}
            <div className="mb-6 text-center">
                <Title
                    align="center"
                    size="sm"
                    title="Câu Hỏi Thường Gặp Về Làm Đồng Phục Tại Hải Anh"
                    subtitle="Đồng phục từ lâu đã trở thành một phần không thể thiếu trong bộ nhận diện của các doanh nghiệp, công ty hay tổ chức, nhằm tạo sự đồng nhất và quảng bá thương hiệu. Nhu cầu may đồng phục cũng vì vậy mà luôn có dấu hiệu tăng cao. Thế nhưng, xoay quanh chủ đề này là rất nhiều câu hỏi được khách hàng đặt ra và chưa thể có lời giải đáp chính xác nhất. Nội dung bài viết là tổng hợp và giải đáp những câu hỏi thường gặp khi làm đồng phục dựa trên kinh nghiệm từ Đồng phục Hải Anh."
                    titleClassName="text-gray-900 font-semibold"
                    subtitleClassName="text-gray-600"
                    overlineClassName="text-gray-500"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3 rounded-xl bg-white shadow-sm p-6 mb-10">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Các câu hỏi thường gặp về thiết kế đồng phục</h2>
                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế áo thun có mất tiền không?</h3>
                    <p className="text-gray-700">Tại đồng phục Hải Anh, dịch vụ thiết kế áo thun đồng phục hoàn toàn miễn phí cho đến khi khách hàng thực sự hài lòng và ưng ý.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế đồng phục gồm gì nhiều?</h3>
                    <p className="text-gray-700">Thiết kế đồng phục là công đoạn định hình kiểu dáng và các chi tiết đặc trưng trên đồng phục. Bao gồm các chi tiết in thêu, phối màu trên cổ áo – thân áo, hoặc cắt xẻ áo,… theo yêu cầu của khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi chưa có mẫu thiết kế đồng phục thì phải làm sao?</h3>
                    <p className="text-gray-700">Hải Anh luôn có sẵn một kho áo mẫu đa dạng phong cách, thiết kế và màu sắc, giúp khách hàng dễ dàng lựa chọn mẫu áo ưng ý nhất. Bên cạnh đó, đối với các đơn hàng có số lượng 20 chiếc trở lên, Hải Anh hỗ trợ thiết kế miễn phí, bao gồm cả miễn phí thiết kế logo nếu khách hàng chưa có logo cá nhân.</p>
                    <p className="text-gray-700">Đội ngũ tư vấn viên và thiết kế của Hải Anh luôn sẵn sàng để hỗ trợ khách hàng trong thời gian sớm nhất.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Nếu tôi đã có mẫu thiết kế thì như thế nào?</h3>
                    <p className="text-gray-700">Trong trường hợp khách hàng đã có sẵn mẫu thiết kế đồng phục, bộ phận thiết kế của Hải Anh sẽ kiểm tra tình phù hợp kỹ thuật in/thêu. Nếu thiết kế có sẵn phù hợp sẽ bắt đầu các công đoạn sản xuất tiếp theo. Nếu mẫu thiết kế chưa phù hợp sẽ hỗ trợ chỉnh sửa miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thời gian nhận được mẫu thiết kế mất bao lâu?</h3>
                    <p className="text-gray-700">Tùy vào yêu cầu của khách hàng, thời gian nhận mẫu thiết kế thường mất khoảng 30 phút đến 1 giờ đối với các mẫu đơn giản. Các thiết kế có độ phục tạp cao, cần cung cấp đầy đủ thông tin thì thời gian kéo dài hơn 1 giờ cho đến nửa ngày.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Mẫu thiết kế vẽ tay có sử dụng làm áo thun đồng phục được không?</h3>
                    <p className="text-gray-700">Dựa trên mẫu thiết kế vẽ tay phác thảo của khách hàng, đội ngũ thiết kế của Hải Anh sẽ hoàn thiện bản thiết kế trên máy tính. Chi phí hỗ trợ thiết kế có thể miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi có thể chỉnh sửa mẫu thiết kế đồng phục công ty bao nhiêu lần?</h3>
                    <p className="text-gray-700">Thông thường chỉnh sửa mẫu thiết kế sẽ không giới hạn số lần và chỉ dừng lại khi khách hàng đã thực sự hài lòng.</p>
                    <p className="text-gray-700">Tuy nhiên trong trường hợp quá số lần sửa hoặc khách hàng vẫn không hài lòng với bản thiết kế, nhân viên sale sẽ tư vấn và làm rõ các thông tin để thiết kế mẫu đẹp nhất, tiết kiệm tối đa thời gian cho khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Cần chuẩn bị những gì để có được mẫu logo và thiết kế đồng phục ưng ý?</h3>
                    <p className="text-gray-700">Để quá trình thiết kế đồng phục trở nên thuận tiện và nhanh chóng, khách hàng cần xác định rõ mục đích, kích cỡ/hình dạng, thông tin, màu sắc, thông điệp và ngân sách mà khách hàng mong muốn khi làm đồng phục.</p>
                    <p className="text-gray-700">Hải Anh đang cung cấp các sản phẩm đồng phục với chi phí rẻ cùng chất lượng cao cấp so với thị trường. Do đó, khách hàng hoàn toàn có thể tin tưởng để chia sẻ và yên tâm về mức giá.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img src={cauhoi1} alt="Hình 1" className="w-full h-auto object-cover" />
                </div>
            </div>

            {/* Block 2 header + intro */}
            <div className="grid gap-6 lg:grid-cols-3 rounded-xl bg-white shadow-sm p-6 mb-10">
                <div className="rounded-lg overflow-hidden">
                    <img src={cauhoi2} alt="Hình 1" className="w-full h-auto  object-cover" />
                </div>
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Các câu hỏi thường gặp về thiết kế đồng phục</h2>
                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế áo thun có mất tiền không?</h3>
                    <p className="text-gray-700">Tại đồng phục Hải Anh, dịch vụ thiết kế áo thun đồng phục hoàn toàn miễn phí cho đến khi khách hàng thực sự hài lòng và ưng ý.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế đồng phục gồm gì nhiều?</h3>
                    <p className="text-gray-700">Thiết kế đồng phục là công đoạn định hình kiểu dáng và các chi tiết đặc trưng trên đồng phục. Bao gồm các chi tiết in thêu, phối màu trên cổ áo – thân áo, hoặc cắt xẻ áo,… theo yêu cầu của khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi chưa có mẫu thiết kế đồng phục thì phải làm sao?</h3>
                    <p className="text-gray-700">Hải Anh luôn có sẵn một kho áo mẫu đa dạng phong cách, thiết kế và màu sắc, giúp khách hàng dễ dàng lựa chọn mẫu áo ưng ý nhất. Bên cạnh đó, đối với các đơn hàng có số lượng 20 chiếc trở lên, Hải Anh hỗ trợ thiết kế miễn phí, bao gồm cả miễn phí thiết kế logo nếu khách hàng chưa có logo cá nhân.</p>
                    <p className="text-gray-700">Đội ngũ tư vấn viên và thiết kế của Hải Anh luôn sẵn sàng để hỗ trợ khách hàng trong thời gian sớm nhất.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Nếu tôi đã có mẫu thiết kế thì như thế nào?</h3>
                    <p className="text-gray-700">Trong trường hợp khách hàng đã có sẵn mẫu thiết kế đồng phục, bộ phận thiết kế của Hải Anh sẽ kiểm tra tình phù hợp kỹ thuật in/thêu. Nếu thiết kế có sẵn phù hợp sẽ bắt đầu các công đoạn sản xuất tiếp theo. Nếu mẫu thiết kế chưa phù hợp sẽ hỗ trợ chỉnh sửa miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thời gian nhận được mẫu thiết kế mất bao lâu?</h3>
                    <p className="text-gray-700">Tùy vào yêu cầu của khách hàng, thời gian nhận mẫu thiết kế thường mất khoảng 30 phút đến 1 giờ đối với các mẫu đơn giản. Các thiết kế có độ phục tạp cao, cần cung cấp đầy đủ thông tin thì thời gian kéo dài hơn 1 giờ cho đến nửa ngày.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Mẫu thiết kế vẽ tay có sử dụng làm áo thun đồng phục được không?</h3>
                    <p className="text-gray-700">Dựa trên mẫu thiết kế vẽ tay phác thảo của khách hàng, đội ngũ thiết kế của Hải Anh sẽ hoàn thiện bản thiết kế trên máy tính. Chi phí hỗ trợ thiết kế có thể miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi có thể chỉnh sửa mẫu thiết kế đồng phục công ty bao nhiêu lần?</h3>
                    <p className="text-gray-700">Thông thường chỉnh sửa mẫu thiết kế sẽ không giới hạn số lần và chỉ dừng lại khi khách hàng đã thực sự hài lòng.</p>
                    <p className="text-gray-700">Tuy nhiên trong trường hợp quá số lần sửa hoặc khách hàng vẫn không hài lòng với bản thiết kế, nhân viên sale sẽ tư vấn và làm rõ các thông tin để thiết kế mẫu đẹp nhất, tiết kiệm tối đa thời gian cho khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Cần chuẩn bị những gì để có được mẫu logo và thiết kế đồng phục ưng ý?</h3>
                    <p className="text-gray-700">Để quá trình thiết kế đồng phục trở nên thuận tiện và nhanh chóng, khách hàng cần xác định rõ mục đích, kích cỡ/hình dạng, thông tin, màu sắc, thông điệp và ngân sách mà khách hàng mong muốn khi làm đồng phục.</p>
                    <p className="text-gray-700">Hải Anh đang cung cấp các sản phẩm đồng phục với chi phí rẻ cùng chất lượng cao cấp so với thị trường. Do đó, khách hàng hoàn toàn có thể tin tưởng để chia sẻ và yên tâm về mức giá.</p>
                </div>

            </div>

            {/* Block 3 header + intro */}
            <div className="grid gap-6 lg:grid-cols-3 rounded-xl bg-white shadow-sm p-6 mb-10">
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Các câu hỏi thường gặp về thiết kế đồng phục</h2>
                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế áo thun có mất tiền không?</h3>
                    <p className="text-gray-700">Tại đồng phục Hải Anh, dịch vụ thiết kế áo thun đồng phục hoàn toàn miễn phí cho đến khi khách hàng thực sự hài lòng và ưng ý.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế đồng phục gồm gì nhiều?</h3>
                    <p className="text-gray-700">Thiết kế đồng phục là công đoạn định hình kiểu dáng và các chi tiết đặc trưng trên đồng phục. Bao gồm các chi tiết in thêu, phối màu trên cổ áo – thân áo, hoặc cắt xẻ áo,… theo yêu cầu của khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi chưa có mẫu thiết kế đồng phục thì phải làm sao?</h3>
                    <p className="text-gray-700">Hải Anh luôn có sẵn một kho áo mẫu đa dạng phong cách, thiết kế và màu sắc, giúp khách hàng dễ dàng lựa chọn mẫu áo ưng ý nhất. Bên cạnh đó, đối với các đơn hàng có số lượng 20 chiếc trở lên, Hải Anh hỗ trợ thiết kế miễn phí, bao gồm cả miễn phí thiết kế logo nếu khách hàng chưa có logo cá nhân.</p>
                    <p className="text-gray-700">Đội ngũ tư vấn viên và thiết kế của Hải Anh luôn sẵn sàng để hỗ trợ khách hàng trong thời gian sớm nhất.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Nếu tôi đã có mẫu thiết kế thì như thế nào?</h3>
                    <p className="text-gray-700">Trong trường hợp khách hàng đã có sẵn mẫu thiết kế đồng phục, bộ phận thiết kế của Hải Anh sẽ kiểm tra tình phù hợp kỹ thuật in/thêu. Nếu thiết kế có sẵn phù hợp sẽ bắt đầu các công đoạn sản xuất tiếp theo. Nếu mẫu thiết kế chưa phù hợp sẽ hỗ trợ chỉnh sửa miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thời gian nhận được mẫu thiết kế mất bao lâu?</h3>
                    <p className="text-gray-700">Tùy vào yêu cầu của khách hàng, thời gian nhận mẫu thiết kế thường mất khoảng 30 phút đến 1 giờ đối với các mẫu đơn giản. Các thiết kế có độ phục tạp cao, cần cung cấp đầy đủ thông tin thì thời gian kéo dài hơn 1 giờ cho đến nửa ngày.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Mẫu thiết kế vẽ tay có sử dụng làm áo thun đồng phục được không?</h3>
                    <p className="text-gray-700">Dựa trên mẫu thiết kế vẽ tay phác thảo của khách hàng, đội ngũ thiết kế của Hải Anh sẽ hoàn thiện bản thiết kế trên máy tính. Chi phí hỗ trợ thiết kế có thể miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi có thể chỉnh sửa mẫu thiết kế đồng phục công ty bao nhiêu lần?</h3>
                    <p className="text-gray-700">Thông thường chỉnh sửa mẫu thiết kế sẽ không giới hạn số lần và chỉ dừng lại khi khách hàng đã thực sự hài lòng.</p>
                    <p className="text-gray-700">Tuy nhiên trong trường hợp quá số lần sửa hoặc khách hàng vẫn không hài lòng với bản thiết kế, nhân viên sale sẽ tư vấn và làm rõ các thông tin để thiết kế mẫu đẹp nhất, tiết kiệm tối đa thời gian cho khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Cần chuẩn bị những gì để có được mẫu logo và thiết kế đồng phục ưng ý?</h3>
                    <p className="text-gray-700">Để quá trình thiết kế đồng phục trở nên thuận tiện và nhanh chóng, khách hàng cần xác định rõ mục đích, kích cỡ/hình dạng, thông tin, màu sắc, thông điệp và ngân sách mà khách hàng mong muốn khi làm đồng phục.</p>
                    <p className="text-gray-700">Hải Anh đang cung cấp các sản phẩm đồng phục với chi phí rẻ cùng chất lượng cao cấp so với thị trường. Do đó, khách hàng hoàn toàn có thể tin tưởng để chia sẻ và yên tâm về mức giá.</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img src={cauhoi3} alt="Hình 1" className="w-full h-auto object-cover" />
                </div>
            </div>

            {/* Block 4 header + intro */}
            <div className="grid gap-6 lg:grid-cols-3 rounded-xl bg-white shadow-sm p-6">
                <div className="rounded-lg overflow-hidden">
                    <img src={cauhoi4} alt="Hình 1" className="w-full h-auto object-cover" />
                </div>
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Các câu hỏi thường gặp về thiết kế đồng phục</h2>
                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế áo thun có mất tiền không?</h3>
                    <p className="text-gray-700">Tại đồng phục Hải Anh, dịch vụ thiết kế áo thun đồng phục hoàn toàn miễn phí cho đến khi khách hàng thực sự hài lòng và ưng ý.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thiết kế đồng phục gồm gì nhiều?</h3>
                    <p className="text-gray-700">Thiết kế đồng phục là công đoạn định hình kiểu dáng và các chi tiết đặc trưng trên đồng phục. Bao gồm các chi tiết in thêu, phối màu trên cổ áo – thân áo, hoặc cắt xẻ áo,… theo yêu cầu của khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi chưa có mẫu thiết kế đồng phục thì phải làm sao?</h3>
                    <p className="text-gray-700">Hải Anh luôn có sẵn một kho áo mẫu đa dạng phong cách, thiết kế và màu sắc, giúp khách hàng dễ dàng lựa chọn mẫu áo ưng ý nhất. Bên cạnh đó, đối với các đơn hàng có số lượng 20 chiếc trở lên, Hải Anh hỗ trợ thiết kế miễn phí, bao gồm cả miễn phí thiết kế logo nếu khách hàng chưa có logo cá nhân.</p>
                    <p className="text-gray-700">Đội ngũ tư vấn viên và thiết kế của Hải Anh luôn sẵn sàng để hỗ trợ khách hàng trong thời gian sớm nhất.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Nếu tôi đã có mẫu thiết kế thì như thế nào?</h3>
                    <p className="text-gray-700">Trong trường hợp khách hàng đã có sẵn mẫu thiết kế đồng phục, bộ phận thiết kế của Hải Anh sẽ kiểm tra tình phù hợp kỹ thuật in/thêu. Nếu thiết kế có sẵn phù hợp sẽ bắt đầu các công đoạn sản xuất tiếp theo. Nếu mẫu thiết kế chưa phù hợp sẽ hỗ trợ chỉnh sửa miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Thời gian nhận được mẫu thiết kế mất bao lâu?</h3>
                    <p className="text-gray-700">Tùy vào yêu cầu của khách hàng, thời gian nhận mẫu thiết kế thường mất khoảng 30 phút đến 1 giờ đối với các mẫu đơn giản. Các thiết kế có độ phục tạp cao, cần cung cấp đầy đủ thông tin thì thời gian kéo dài hơn 1 giờ cho đến nửa ngày.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Mẫu thiết kế vẽ tay có sử dụng làm áo thun đồng phục được không?</h3>
                    <p className="text-gray-700">Dựa trên mẫu thiết kế vẽ tay phác thảo của khách hàng, đội ngũ thiết kế của Hải Anh sẽ hoàn thiện bản thiết kế trên máy tính. Chi phí hỗ trợ thiết kế có thể miễn phí.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Tôi có thể chỉnh sửa mẫu thiết kế đồng phục công ty bao nhiêu lần?</h3>
                    <p className="text-gray-700">Thông thường chỉnh sửa mẫu thiết kế sẽ không giới hạn số lần và chỉ dừng lại khi khách hàng đã thực sự hài lòng.</p>
                    <p className="text-gray-700">Tuy nhiên trong trường hợp quá số lần sửa hoặc khách hàng vẫn không hài lòng với bản thiết kế, nhân viên sale sẽ tư vấn và làm rõ các thông tin để thiết kế mẫu đẹp nhất, tiết kiệm tối đa thời gian cho khách hàng.</p>

                    <h3 className="font-bold text-gray-800 mt-3">Cần chuẩn bị những gì để có được mẫu logo và thiết kế đồng phục ưng ý?</h3>
                    <p className="text-gray-700">Để quá trình thiết kế đồng phục trở nên thuận tiện và nhanh chóng, khách hàng cần xác định rõ mục đích, kích cỡ/hình dạng, thông tin, màu sắc, thông điệp và ngân sách mà khách hàng mong muốn khi làm đồng phục.</p>
                    <p className="text-gray-700">Hải Anh đang cung cấp các sản phẩm đồng phục với chi phí rẻ cùng chất lượng cao cấp so với thị trường. Do đó, khách hàng hoàn toàn có thể tin tưởng để chia sẻ và yên tâm về mức giá.</p>
                </div>

            </div>
        </section>
    )
}

export default CauHoiThuongGap
