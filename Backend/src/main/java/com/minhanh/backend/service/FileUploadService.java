package com.minhanh.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String publicId = "minhanh-" + UUID.randomUUID().toString(); // Random UUID để tránh trùng file
        
        // Gọi lên máy chủ Cloudinary để lưu hình ảnh
        Map uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), 
                ObjectUtils.asMap("public_id", publicId));

        // Trả về địa chỉ HTTPS an toàn của tấm hình
        return uploadResult.get("secure_url").toString();
    }

    /**
     * Xóa ảnh khỏi Cloudinary bằng cách trích xuất public_id từ URL.
     * Ví dụ URL: https://res.cloudinary.com/demo/image/upload/v1234/minhanh-xxxx.jpg
     *  -> public_id = "minhanh-xxxx"
     */
    public void deleteFile(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return;
        try {
            // Lấy phần cuối path: "minhanh-xxxx.jpg" rồi bỏ đuôi file
            String path = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            String publicId = path.contains(".") ? path.substring(0, path.lastIndexOf(".")) : path;
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            // Ghi log nhưng không ném exception để không làm gián đoạn luồng chính
            System.err.println("[Cloudinary] Không thể xóa ảnh: " + imageUrl + " | Lỗi: " + e.getMessage());
        }
    }
}
